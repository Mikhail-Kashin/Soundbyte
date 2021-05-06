const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Song } = require('../../db/models')
const {
  singleMulterUpload,
  singlePublicFileUpload,
} = require("../../awsS3");

const router = express.Router();


// get all songs
router.get ('/', asyncHandler(async (req, res) => {
  const songs = await Song.findAll()
  // console.log('------->test', songs)
  return res.json(songs)
}))


// post a new song aws
router.post('/new',singleMulterUpload("songUrl"), asyncHandler(async (req, res) => {
  const {songName, songGenre} = req.body;
  // console.log('--------------->testing', songName)
  const songUrl = await singlePublicFileUpload(req.file);
  const newSong = await Song.create({
    songUrl,
    songName,
    songGenre
  })
   await res.json(newSong)
}))

//temp post route no aws
// router.post('/new', asyncHandler(async (req, res) => {
//   const {songUrl, songName, songGenre} = req.body;
//   const newSong = await Song.create({
//     songUrl,
//     songName,
//     songGenre
//   })
//    await res.json(newSong)
// }))



module.exports = router;
