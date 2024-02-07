const { bookSchema, returnBorrowSchema } = require('../validation/bookSchema');
const Book = require('../models/Book');
const User = require('../models/User');

// Add a new book
exports.addBook = async (req, res) => {
    try {
        // Validate
        const { title, author, ISBN, quantityAvailable } = bookSchema.parse(req.body);

        // Create a new book
        const newBook = new Book({ title, author, ISBN, quantityAvailable });
        const savedBook = await newBook.save();

        res.status(201).json({ message: 'Book added successfully', data: savedBook });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
    try {
        // Validate
        const { bookId, userId } = returnBorrowSchema.parse(req.params);

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the book is available for borrowing
        if (book.quantityAvailable === 0) {
            return res.status(400).json({ message: 'Book not available for borrowing' });
        }

        // Update the quantity available and mark the book as borrowed
        book.quantityAvailable -= 1;
        book.borrowedUsers.push(userId);
        await book.save();

        res.json({ message: 'Book borrowed successfully', data: book });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    try {
        // Validate
        const { bookId, userId } = returnBorrowSchema.parse(req.params);

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has borrowed the book
        if (!book.borrowedUsers.includes(userId)) {
            return res.status(400).json({ message: 'User has not borrowed this book' });
        }

        // Update the quantity available and mark the book as returned
        book.quantityAvailable += 1;
        book.borrowedUsers = book.borrowedUsers.filter(id => id !== userId);
        await book.save();

        res.json({ message: 'Book returned successfully', data: book });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};