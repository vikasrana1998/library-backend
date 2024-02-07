const { z } = require('zod');

const bookSchema = z.object({
    title: z.string().min(1).max(255),
    author: z.string().min(1).max(255),
    ISBN: z.string().min(10).max(20), // A 13-digit number that uniquely identifies books and book-like products published internationally
    quantityAvailable: z.number().int().positive(),
});

const returnBorrowSchema = z.object({
    bookId: z.string().min(1),
    userId: z.string().min(1)
});

module.exports = { bookSchema, returnBorrowSchema };
