const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/books', bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books', bookController.createBook); // Allow PUT for creating books
router.put('/books/:id', bookController.updateBook);
router.patch('/books', bookController.createBook); // Allow PATCH for creating books
router.patch('/books/:id', bookController.patchBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;