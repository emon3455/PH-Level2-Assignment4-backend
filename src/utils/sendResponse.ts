// utils/sendResponse.ts
import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const sendResponse = <T>(
  res: Response,
  { success, message, data }: ApiResponse<T>
): Response => {
  return res.status(200).json({ success, message, data });
};
