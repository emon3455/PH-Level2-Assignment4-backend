import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';
import { sendResponse } from '../utils/sendResponse';

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);
    if (!book || book.copies < quantity) throw new Error('Not enough copies available');

    book.copies -= quantity;
    book.updateAvailability();
    await book.save();

    const borrowRecord = await Borrow.create({ book: bookId, quantity, dueDate });
    sendResponse(res, { success: true, message: 'Book borrowed successfully', data: borrowRecord });
  } catch (err) {
    next(err);
  }
};

export const getBorrowedSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
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

    sendResponse(res, { success: true, message: 'Borrowed books summary retrieved successfully', data: summary });
  } catch (err) {
    next(err);
  }
};
