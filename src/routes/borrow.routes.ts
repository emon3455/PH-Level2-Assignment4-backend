import express from 'express';
import { borrowBook, getBorrowedSummary } from '../controllers/borrow.controller';

const router = express.Router();

router.post('/', borrowBook);
router.get('/', getBorrowedSummary);

export default router;
