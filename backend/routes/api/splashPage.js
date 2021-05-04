const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Song } = require('../../db/models')
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require("../../awsS3");

const router = express.Router();


// get all songs
router.get ('/', asyncHandler(async (res, req) => {
  const songs = await Song.findAll()
  return res.json(songs)
}))


// post a new song
router.post('/new',singlePublicFileUpload('songUpload'), asyncHandler(async (res, req) => {
  const {songName, songGenre} = req.body;
  const songUrl = await singlePublicFileUpload(req.file);
  const newSong = await Song.create({
    songUrl,
    songName,
    songGenre
  })
  res.json(newSong)
}))

module.exports = router;
