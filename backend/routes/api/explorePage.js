const express = require('express');
const asyncHandler = require('express-async-handler');
const { Song } = require('../../db/models')

const router = express.Router();


//get all songs where uploaded by not logged in user.
router.get ('/', asyncHandler(async (req, res) => {
  const songs = await Song.findAll()
  return res.json(Object.assign({}, songs))
}))


module.exports = router;
