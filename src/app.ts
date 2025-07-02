import express from "express";
import bookRoutes from "./routes/book.routes";
import borrowRoutes from "./routes/borrow.routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Library Management Backend is running!");
});

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.use(globalErrorHandler);

export default app;
