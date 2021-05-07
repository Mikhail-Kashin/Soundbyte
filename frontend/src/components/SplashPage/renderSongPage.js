import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, deleteSong } from '../../store/splashpage';
import AudioPlayer from './audioPlayer'

export const RenderSongPage = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const [songIndex, setSongIndex] = useState(0)

  // console.log(songs)

  function removeSongFunc(e, songId){
    e.preventDefault();
    // console.log('test.......>', songId)
    dispatch(deleteSong(songId))
    dispatch(getSongs())
  }

  const songUrls = () => {
    return Object.values(songs).map(song => song.songUrl)
  }

  function songIndexNum(songUrl) {
    let list = songUrls()
    for (let i = 0; i < list.length; i++) {
      let url = list[i]
      if (url === songUrl){
        return i + 1
      }
    }
  }
  console.log(songIndexNum())

  useEffect(() => {
    dispatch(getSongs())
  },[dispatch])


  return Object.values(songs).map(song => {
    return (
      <div>
        <div className="SongNames">
        <span className="songNum"> {songIndexNum(song.songUrl)}. </span>
        <span> {song.songName} </span>
        <p onClick={(e) => removeSongFunc(e, song.id)} id='removeSong' i class="fas fa-backspace"></p>
        </div>
      </div>
    )
  })

}


export default RenderSongPage;
