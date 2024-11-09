const express = require('express');
const router = express.Router();
const {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
} = require('../controllers/memberController');

// Route to create a new member
router.post('/', createMember);

// Route to get all members
router.get('/', getAllMembers);

// Route to get a single member by ID
router.get('/:id', getMemberById);

// Route to update a member by ID
router.put('/:id', updateMember);

// Route to delete a member by ID
router.delete('/:id', deleteMember);

module.exports = router;
