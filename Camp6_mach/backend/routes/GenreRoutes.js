const express = require('express');
const router = express.Router();
const {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre
} = require('../controllers/genreController');

// Route to create a new genre
router.post('/', createGenre);

// Route to get all genres
router.get('/', getAllGenres);

// Route to get a single genre by ID
router.get('/:id', getGenreById);

// Route to update a genre by ID
router.put('/:id', updateGenre);

// Route to delete a genre by ID
router.delete('/:id', deleteGenre);

module.exports = router;
