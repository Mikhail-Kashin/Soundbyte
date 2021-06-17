const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Song } = require('../../db/models')



const {
  singleMulterUpload,
  singlePublicFileUpload,
  songMulterUpload,
  multiplePublicFileUpload,
  singlePublicFileUploadB,
} = require("../../awsS3");

const router = express.Router();


// get all songs
router.get ('/', asyncHandler(async (req, res) => {
  const songs = await Song.findAll()
  return res.json(Object.assign({}, songs))
}))


// post a new song aws
// router.post('/new',singleMulterUpload("songUrl", "albumPicUrl"), asyncHandler(async (req, res) => {
//   const {userId, songName, songGenre} = req.body;
//   const songUrl = await singlePublicFileUpload(req.file);
//   const albumPicUrl = await singlePublicFileUpload(req.file);
//   // console.log(("------>singlePublicFileUpload file", albumPicUrl))
//   const newSong = await Song.create({
//     userId,
//     songUrl,
//     albumPicUrl,
//     songName,
//     songGenre
//   })
//   console.log('--------wee------->testing', newSong)
//    await res.json(newSong)
// }))

// post a new song aws
router.post('/new', songMulterUpload, asyncHandler(async (req, res) => {
  const {userId, songName, songGenre} = req.body;
  const songUrl = await singlePublicFileUpload(req.file['songUrl'][0], 'songs');
  const albumPicUrl = await singlePublicFileUpload(req.file['albumPicUrl'][0], 'picture');
  // console.log(("------>singlePublicFileUpload file", albumPicUrl))
  const newSong = await Song.create({
    userId,
    songUrl,
    albumPicUrl,
    songName,
    songGenre
  })
  console.log('--------wee------->testing', newSong)
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
