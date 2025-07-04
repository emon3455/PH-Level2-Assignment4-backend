import express from 'express';
import {
  borrowBook,
  getBorrowedSummary,
} from '../controllers/borrow.controller';

const router = express.Router();

router.get('/', getBorrowedSummary);
router.post('/', borrowBook);

export default router;
