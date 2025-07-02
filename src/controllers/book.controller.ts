import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book.model';
import { sendResponse } from '../utils/sendResponse';

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    sendResponse(res, { success: true, message: 'Book created successfully', data: book });
  } catch (err) {
    next(err);
  }
};

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query: any = {};
    if (filter) query.genre = filter;

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(parseInt(limit as string));

    sendResponse(res, { success: true, message: 'Books retrieved successfully', data: books });
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.bookId);
    sendResponse(res, { success: true, message: 'Book retrieved successfully', data: book });
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    sendResponse(res, { success: true, message: 'Book updated successfully', data: book });
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    sendResponse(res, { success: true, message: 'Book deleted successfully', data: null });
  } catch (err) {
    next(err);
  }
};
