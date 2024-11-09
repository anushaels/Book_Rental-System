const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,  // Every member will be linked to a user
        unique: true 
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    membershipDate: { type: Date, default: Date.now },
    rentedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rental' }],
    rentalHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rental' }]
});

module.exports = mongoose.model('Member', memberSchema);
