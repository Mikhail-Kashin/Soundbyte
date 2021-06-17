const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Song, Album } = require('../../db/models')



const {
  singleMulterUpload,
  singlePublicFileUpload,
} = require("../../awsS3");

const router = express.Router();


// get all songs
router.get ('/', asyncHandler(async (req, res) => {
  const songs = await Song.findAll()
  return res.json(Object.assign({}, songs))
}))

// get all albums
router.get('/albums', asyncHandler(async (req, res) => {
  const albums = await Album.findAll()
  return res.json(Object.assign({}, albums))
}))

// post new album aws

router.post('/newAlbum', singleMulterUpload('albumUrl'), asyncHandler(async (req, res) => {
  const {albumName, albumDescription}
  const albumPic = await singlePublicFileUpload(req.file);
  const newAlbum = await Album.create({
    albumPic,
    albumName,
    albumDescription
  })
  await res.json(newAlbum)
}))

// post a new song aws
router.post('/new',singleMulterUpload("songUrl"), asyncHandler(async (req, res) => {
  const {userId, songName, songGenre} = req.body;
  const songUrl = await singlePublicFileUpload(req.file);
  const newSong = await Song.create({
    userId,
    songUrl,
    songName,
    songGenre
  })
  // console.log('--------------->testing', newSong)
   await res.json(newSong)
}))


// delete song
router.delete(`/delete/:songId`, asyncHandler(async (req, res) => {
  const songId = req.params.songId
  const deleteSong = await Song.findOne({where: {id: songId}})
  await deleteSong.destroy()
  res.json(songId)
}))





module.exports = router;
