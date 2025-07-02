"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, { success, message, data }) => {
    return res.status(200).json({ success, message, data });
};
exports.sendResponse = sendResponse;
