"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const borrow_routes_1 = __importDefault(require("./routes/borrow.routes"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Library Management Backend is running!");
});
app.use("/api/books", book_routes_1.default);
app.use("/api/borrow", borrow_routes_1.default);
app.use(globalErrorHandler_1.default);
exports.default = app;
