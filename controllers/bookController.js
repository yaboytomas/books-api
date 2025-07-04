const book = require('../models/Book');
const Counter = require('../models/Counter');

// Function to get next sequence number
const getNextSequence = async (name) => {
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};

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
    const deletedBook = await book.findOneAndDelete({ id: bookId });
    if (!deletedBook) {
        return res.status(404).json({
            status: 'fail',
            message: 'Book not found',
        });
        }
    res.status(200).json({
      status: 'success',
      message: 'Book deleted successfully'
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
    // Handle date conversion if needed
    if (req.body.publishedDate) {
      const dateStr = req.body.publishedDate;
      // Handle DD/MM/YYYY format
      if (typeof dateStr === 'string' && dateStr.includes('/')) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          // Convert DD/MM/YYYY to YYYY-MM-DD format
          const day = parts[0].padStart(2, '0');
          const month = parts[1].padStart(2, '0');
          const year = parts[2];
          req.body.publishedDate = new Date(`${year}-${month}-${day}`);
        }
      }
    }

    // Get next incremental ID
    const nextId = await getNextSequence('bookId');
    req.body.id = nextId;

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
    
    // Handle date conversion if needed
    if (req.body.publishedDate) {
      const dateStr = req.body.publishedDate;
      // Handle DD/MM/YYYY format
      if (typeof dateStr === 'string' && dateStr.includes('/')) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          // Convert DD/MM/YYYY to YYYY-MM-DD format
          const day = parts[0].padStart(2, '0');
          const month = parts[1].padStart(2, '0');
          const year = parts[2];
          req.body.publishedDate = new Date(`${year}-${month}-${day}`);
        }
      }
    }
    
    const updatedBook = await book.findOneAndUpdate(
      { id: bookId },
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
      status: 'success'
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
    const foundBook = await book.findOne({ id: bookId });
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

exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    
    // Handle date conversion if needed
    if (req.body.publishedDate) {
      const dateStr = req.body.publishedDate;
      // Handle DD/MM/YYYY format
      if (typeof dateStr === 'string' && dateStr.includes('/')) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          // Convert DD/MM/YYYY to YYYY-MM-DD format
          const day = parts[0].padStart(2, '0');
          const month = parts[1].padStart(2, '0');
          const year = parts[2];
          req.body.publishedDate = new Date(`${year}-${month}-${day}`);
        }
      }
    }

    const updatedBook = await book.findOneAndUpdate(
      { id: bookId },
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
