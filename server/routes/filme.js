const express = require('express');
const asyncHandler = require('express-async-handler');
const { getFilme, deleteFilm, changeStatusFilm, addFilm } = require('../controllers/filme');

const router = express.Router();

router.get('/filme', asyncHandler(getFilme));
router.patch('/filme/:id', asyncHandler(changeStatusFilm));
router.delete('/filme/:id', asyncHandler(deleteFilm));
router.post('/filme', asyncHandler(addFilm));

module.exports = router;
