export const sendResponse = (res: any, { success, message, data }: any) => {
  return res.status(200).json({ success, message, data });
};
