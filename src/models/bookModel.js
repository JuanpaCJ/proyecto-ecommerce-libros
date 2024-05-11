const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    isbn: { type: String, required: true, unique: true }, // Número ISBN único para el libro
    title: { type: String, required: true }, // Título del libro
    genre: { type: String, required: true }, // Género literario del libro
    author: { type: String, required: true }, // Autor del libro
    publicationDate: { type: Date, required: true }, // Fecha de publicación del libro
    publisher: { type: String, required: true }, // Casa editorial que publicó el libro
    price: { type: Number, required: true }, // Precio del libro
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario que vende el libro
    isDeleted: { type: Boolean, default: false } // Indica si el libro ha sido eliminado (soft delete)
}, { timestamps: true });
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
