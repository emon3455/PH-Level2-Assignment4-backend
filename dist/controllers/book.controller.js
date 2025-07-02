"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const sendResponse_1 = require("../utils/sendResponse");
const createBook = async (req, res, next) => {
    try {
        const book = await book_model_1.Book.create(req.body);
        (0, sendResponse_1.sendResponse)(res, { success: true, message: 'Book created successfully', data: book });
    }
    catch (err) {
        next(err);
    }
};
exports.createBook = createBook;
const getAllBooks = async (req, res, next) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query = {};
        if (filter)
            query.genre = filter;
        const books = await book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(parseInt(limit));
        (0, sendResponse_1.sendResponse)(res, { success: true, message: 'Books retrieved successfully', data: books });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllBooks = getAllBooks;
const getBookById = async (req, res, next) => {
    try {
        const book = await book_model_1.Book.findById(req.params.bookId);
        (0, sendResponse_1.sendResponse)(res, { success: true, message: 'Book retrieved successfully', data: book });
    }
    catch (err) {
        next(err);
    }
};
exports.getBookById = getBookById;
const updateBook = async (req, res, next) => {
    try {
        const book = await book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        (0, sendResponse_1.sendResponse)(res, { success: true, message: 'Book updated successfully', data: book });
    }
    catch (err) {
        next(err);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res, next) => {
    try {
        await book_model_1.Book.findByIdAndDelete(req.params.bookId);
        (0, sendResponse_1.sendResponse)(res, { success: true, message: 'Book deleted successfully', data: null });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteBook = deleteBook;
