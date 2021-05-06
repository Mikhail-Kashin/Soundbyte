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
  const songUrl = await singlePublicFileUpload(req.file);
  const newSong = await Song.create({
    songUrl,
    songName,
    songGenre
  })
  console.log('--------------->testing', newSong)
   await res.json(newSong)
}))


// delete song
router.delete(`/delete/:songId`, asyncHandler(async (req, res) => {
  const songId = parseInt(req.params.songId)
  const deleteSong = await Song.findOne({where: {id: songId}})
  await deleteSong.destroy()
  res.status(200)
  res.send()
}))





module.exports = router;
