const Book = require('./bookModel');
exports.createBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        res.status(400).json({ message: 'Error creating book', error: error.message });
    }
};
exports.getBooks = async (req, res) => {
    try {
        const filters = req.query;
        const books = await Book.find(filters).where('isDeleted').equals(false);
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching books', error: error.message });
    }
};
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book && !book.isDeleted) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found or deleted' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error fetching book', error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        res.status(400).json({ message: 'Error updating book', error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, { isDeleted: true });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting book', error: error.message });
    }
};
