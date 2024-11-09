const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    publication: { type: String, required: true },
    genreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
    rentalRate: { type: Number, default: function() { return this.price * 0.05; } }
});

module.exports = mongoose.model('Book', bookSchema);
