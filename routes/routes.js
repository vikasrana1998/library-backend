const express = require('express');
const router = express.Router();
const bookRoutes = require('./books');
const userRoutes = require('./users');
const authMiddleware = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
// Borrow a book
router.post('/borrow/:bookId/:userId', authMiddleware, bookController.borrowBook);
// Return a book
router.post('/return/:bookId/:userId', authMiddleware, bookController.returnBook);
// Retrieve books borrowed by a specific user
router.get('/:userId/books', authMiddleware, userController.getBorrowedBooks);

module.exports = router;
