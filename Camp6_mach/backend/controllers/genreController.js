const Genre = require('../model/Genre');

// Create a new genre
const createGenre = async (req, res) => {
    try {
        const { name } = req.body;

        const genre = new Genre({ name });
        const savedGenre = await genre.save();

        res.status(201).json(savedGenre);
    } catch (error) {
        res.status(500).json({ message: 'Error creating genre', error: error.message });
    }
};

// Get all genres
const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving genres', error: error.message });
    }
};

// Get a single genre by ID
const getGenreById = async (req, res) => {
    try {
        const { id } = req.params;
        const genre = await Genre.findById(id);

        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving genre', error: error.message });
    }
};

// Update a genre
const updateGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedGenre = await Genre.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        res.status(200).json(updatedGenre);
    } catch (error) {
        res.status(500).json({ message: 'Error updating genre', error: error.message });
    }
};

// Delete a genre
const deleteGenre = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedGenre = await Genre.findByIdAndDelete(id);

        if (!deletedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        res.status(200).json({ message: 'Genre deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting genre', error: error.message });
    }
};

module.exports = {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre,
};
