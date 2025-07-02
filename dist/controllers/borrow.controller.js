"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedSummary = exports.borrowBook = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
const sendResponse_1 = require("../utils/sendResponse");
const borrowBook = async (req, res, next) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await book_model_1.Book.findById(bookId);
        if (!book || book.copies < quantity)
            throw new Error('Not enough copies available');
        book.copies -= quantity;
        book.updateAvailability();
        await book.save();
        const borrowRecord = await borrow_model_1.Borrow.create({ book: bookId, quantity, dueDate });
        (0, sendResponse_1.sendResponse)(res, { success: true, message: 'Book borrowed successfully', data: borrowRecord });
    }
    catch (err) {
        next(err);
    }
};
exports.borrowBook = borrowBook;
const getBorrowedSummary = async (req, res, next) => {
    try {
        const summary = await borrow_model_1.Borrow.aggregate([
            { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo',
                },
            },
            { $unwind: '$bookInfo' },
            {
                $project: {
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn',
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        (0, sendResponse_1.sendResponse)(res, { success: true, message: 'Borrowed books summary retrieved successfully', data: summary });
    }
    catch (err) {
        next(err);
    }
};
exports.getBorrowedSummary = getBorrowedSummary;
