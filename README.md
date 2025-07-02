# Library Management API (Express + TypeScript + MongoDB)

This is a backend API for a Library Management System built using **Express.js**, **TypeScript**, and **MongoDB** with Mongoose.

---

## Features

- Create, read, update, delete books
- Borrow books with business logic validation
- Book availability control (auto-disabled when out of stock)
- Aggregated borrowed book summaries
- Query support: filter, sort, limit
- Error handling with consistent response format
- Mongoose middleware, instance methods, and validation

---

## Folder Structure

```
src/
├── config/              # Database connection
├── controllers/         # Request handlers
├── models/              # Mongoose schemas
├── routes/              # API route definitions
├── middlewares/         # Error handler
├── utils/               # Response utilities
├── app.ts               # Express app setup
└── server.ts            # Entry point
```

---

## Installation Instructions

### 1. Clone the repo
```bash
git clone https://github.com/emon3455/PH-Level2-Assignment3.git
cd PH-Level2-Assignment3
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
Create a file named `.env` at the root level and add:
```
MONGODB_URI=your-mongodb-connection-string
```

Example:
```
MONGODB_URI=mongodb+srv://testusername:testpass@cluster0.zyyhzcl.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0
```

### 4. Run the server
```bash
npm run dev
```

---

## 🔌 API Endpoints

### 📚 Books
- `POST /api/books` → Create a book
- `GET /api/books` → Get all books (with filter, sort, limit)
- `GET /api/books/:id` → Get one book
- `PUT /api/books/:id` → Update book
- `DELETE /api/books/:id` → Delete book

### 📖 Borrow
- `POST /api/borrow` → Borrow books (deduct copies, set availability)
- `GET /api/borrow` → Get borrowed summary (aggregate)

---

##  Contact

For any issues, contact: [emon.mhk69@gmail.com]