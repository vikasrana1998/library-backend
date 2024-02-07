const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    ISBN: {
        type: String,
        required: true,
        unique: true,
    },
    quantityAvailable: {
        type: Number,
        required: true,
        default: 1,
    },
    borrowedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

module.exports = mongoose.model('Book', bookSchema);
