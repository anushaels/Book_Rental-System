const express = require('express');
const router = express.Router();
const {
    createRental,
    getAllRentals,
    getRentalById,
    returnRental,
    deleteRental
} = require('../controllers/rentalController');

// Route to create a new rental
router.post('/', createRental);

// Route to get all rentals
router.get('/', getAllRentals);

// Route to get a single rental by ID
router.get('/:id', getRentalById);

// Route to update (return) a rental
router.put('/:id/return', returnRental);

// Route to delete a rental
router.delete('/:id', deleteRental);

module.exports = router;
