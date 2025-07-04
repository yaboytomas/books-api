const book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await book.find();
    res.status(200).json({
      status: 'success',
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
}

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await book.findByIdAndDelete(bookId);
    if (!deletedBook) {
        return res.status(404).json({
            status: 'fail',
            message: 'Book not found',
        });
        }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {   
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
}

exports.createBook = async (req, res) => {
  try {
    const newBook = await book.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}   

exports.patchBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = await book.findByIdAndUpdate(
      bookId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({
        status: 'fail',
        message: 'Book not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        book: updatedBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}

exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const foundBook = await book.findById(bookId);
    if (!foundBook) {
      return res.status(404).json({
        status: 'fail',
        message: 'Book not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        book: foundBook,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
}

