const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');

/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the genre
 *         name:
 *           type: string
 *           description: Genre name
 *       example:
 *         name: Drama
 */

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: List of Movie Genres
 */


/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Returns the list of all the genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: The list of the genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 */
// Get all genres
router.get('/genres', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * @swagger
 * /genres-movies:
 *   get:
 *     summary: Returns the list of all the genres with movies
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: The list of the genres with movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 */
// Get all genres with movies
router.get('/genres-movies', async (req, res) => {
  try {
    const genres = await Genre.find().populate('movies');
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /genres/{genreId}/movies:
 *   get:
 *     summary: Get movies by genre
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: genreId
 *         schema:
 *           type: string
 *         required: true
 *         description: The genre id
 *     responses:
 *       200:
 *         description: List of movies by genre
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Genre not found
 */
router.get('/genres/:genreId/movies', async (req, res) => {
  const { genreId } = req.params;
  try {
    const genre = await Genre.findById(genreId).populate('movies');
    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    res.json(genre.movies);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       201:
 *         description: The genre was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Invalid data
 */
router.post('/genres', async (req, res) => {
  const { name } = req.body;
  try {
    const genre = await Genre.create({
      name,
    });
    res.status(201).json({ message: 'Genre Created', genre });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

/**
 * @swagger
 * /genres/{genreId}:
 *   delete:
 *     summary: Remove the genre by id
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: genreId
 *         schema:
 *           type: string
 *         required: true
 *         description: The genre id
 * 
 *     responses:
 *       200:
 *         description: The genre was deleted
 *       404:
 *         description: Genre not found
 */
router.delete('/genres/:genreId', async (req, res) => {
  const { genreId } = req.params;
  try {
    const genre = await Genre.findByIdAndDelete(genreId);
    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    res.json({ message: 'Genre deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
