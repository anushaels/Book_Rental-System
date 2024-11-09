const Rental = require('../model/Rental');
const Member = require('../model/Member');
const Book = require('../model/Book');

// Create a new rental
const createRental = async (req, res) => {
    try {
        const { memberId, bookId, dueDate } = req.body;

        const rental = new Rental({
            memberId,
            bookId,
            dueDate
        });

        // Save the rental
        const savedRental = await rental.save();

        // Update the member's rentedBooks array
        await Member.findByIdAndUpdate(memberId, {
            $push: { rentedBooks: savedRental._id }
        });

        res.status(201).json(savedRental);
    } catch (error) {
        res.status(500).json({ message: 'Error creating rental', error: error.message });
    }
};

// Get all rentals
const getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.find()
            .populate('memberId', 'name email')
            .populate('bookId', 'name author');
        res.status(200).json(rentals);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving rentals', error: error.message });
    }
};

// Get a single rental by ID
const getRentalById = async (req, res) => {
    try {
        const { id } = req.params;
        const rental = await Rental.findById(id)
            .populate('memberId', 'name email')
            .populate('bookId', 'name author');

        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        res.status(200).json(rental);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving rental', error: error.message });
    }
};

// Update rental (return a book)
const returnRental = async (req, res) => {
    try {
        const { id } = req.params;
        const { returnDate } = req.body;

        const rental = await Rental.findById(id);
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        rental.returnDate = returnDate;

        // Calculate fine if the return date is after the due date
        if (new Date(returnDate) > rental.dueDate) {
            const overdueDays = Math.ceil((new Date(returnDate) - rental.dueDate) / (1000 * 60 * 60 * 24));
            rental.fine = overdueDays;
        }

        const updatedRental = await rental.save();

        // Update the member's rental history
        await Member.findByIdAndUpdate(rental.memberId, {
            $push: { rentalHistory: updatedRental._id },
            $pull: { rentedBooks: updatedRental._id }
        });

        res.status(200).json(updatedRental);
    } catch (error) {
        res.status(500).json({ message: 'Error returning rental', error: error.message });
    }
};

// Delete a rental
const deleteRental = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRental = await Rental.findByIdAndDelete(id);
        if (!deletedRental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        // Remove rental reference from member's rentedBooks and rentalHistory
        await Member.findByIdAndUpdate(deletedRental.memberId, {
            $pull: { rentedBooks: deletedRental._id, rentalHistory: deletedRental._id }
        });

        res.status(200).json({ message: 'Rental deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting rental', error: error.message });
    }
};

module.exports = {
    createRental,
    getAllRentals,
    getRentalById,
    returnRental,
    deleteRental,
};
