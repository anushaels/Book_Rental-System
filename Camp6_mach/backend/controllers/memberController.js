const Member = require('../model/Member');

// Create a new member
const createMember = async (req, res) => {
    try {
        const { name, email } = req.body;

        const member = new Member({
            name,
            email
        });

        const savedMember = await member.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(500).json({ message: 'Error creating member', error: error.message });
    }
};

// Get all members
const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find().populate('rentedBooks rentalHistory');
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving members', error: error.message });
    }
};

// Get a single member by ID
const getMemberById = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findById(id).populate('rentedBooks rentalHistory');

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving member', error: error.message });
    }
};

// Update member details
const updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const updatedMember = await Member.findByIdAndUpdate(
            id,
            { name, email },
            { new: true }
        );

        if (!updatedMember) {
            return res.status(404).json({ message: 'Member not found' });
        }

        res.status(200).json(updatedMember);
    } catch (error) {
        res.status(500).json({ message: 'Error updating member', error: error.message });
    }
};

// Delete a member
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMember = await Member.findByIdAndDelete(id);

        if (!deletedMember) {
            return res.status(404).json({ message: 'Member not found' });
        }

        res.status(200).json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting member', error: error.message });
    }
};

module.exports = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,
};
