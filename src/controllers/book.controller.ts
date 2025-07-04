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
    const {
      filter,
      searchTerm,    // <-- Add searchTerm from query
      sortBy = 'createdAt',
      sort = 'desc',
      limit = '10',
      page = '1',
    } = req.query;

    const query: any = {};

    // Filter by genre if provided
    if (filter) query.genre = filter;

    // Search by title if searchTerm is provided (case-insensitive regex)
    if (searchTerm) {
      query.title = { $regex: searchTerm as string, $options: "i" };
    }

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string));

    const total = await Book.countDocuments(query);

    sendResponse(res, {
      success: true,
      message: 'Books retrieved successfully',
      data: {
        books,
        meta: {
          total,
          limit: Number(limit),
          page: Number(page),
        },
      },
    });
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
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return sendResponse(res, {
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    const { title, author, genre, isbn, description, copies } = req.body;

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (genre !== undefined) book.genre = genre;
    if (isbn !== undefined) book.isbn = isbn;
    if (description !== undefined) book.description = description;
    if (copies !== undefined) book.copies = copies;

    book.updateAvailability?.();
    await book.save();

    sendResponse(res, {
      success: true,
      message: "Book updated successfully",
      data: book,
    });
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
