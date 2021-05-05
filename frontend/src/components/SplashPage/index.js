import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from '../../store/splashpage'
import './splashPage.css'

function SongPage() {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const songName = songs.songName
  const currentUserId = useSelector(state => state.session.user.id)
  // console.log('testing------->songs', songs)
  // console.log('testing.........>user', currentUserId)
  console.log('testing______>', songs.songName)


  useEffect(() => {
    dispatch(getSongs())

  },[dispatch])


const renderSongPage = () => {
  return Object.values(songs).map(song => {

    return (
      <div>
        <p>{song.songName}</p>
      </div>
    )

  })
}

return (
  <div>
    <p className="yourSongs">Your Songs</p>
    <div>
      {renderSongPage()}
    </div>
  </div>
)

}

export default SongPage;
