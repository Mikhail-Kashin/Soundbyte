import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, deleteSong } from '../../store/splashpage';
import { audioController } from '../../store/audiocontroller'

export const RenderSongPage = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const sessionUser = useSelector(state => state.session.user);
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

  useEffect(() => {
    console.log('testing id', sessionUser.id)
  },[dispatch,sessionUser])

  function renderNames(){
    return Object.values(songs).map(song => {
      return (
        <div>
          <span className="songNum"> {songIndexNum(song.songUrl)}. </span>
          <span onClick={(e) => dispatch(audioController(song.id))}> {song.songName} </span>
          <span onClick={(e) => removeSongFunc(e, song.id)} id='removeSong' i class="fas fa-backspace"></span>
        </div>
      )
    })
  }

  return (
    <div>
      <div className="headings"><span>#</span><span>title</span><span>Delete</span></div>
      <div>{renderNames()}</div>
    </div>
  )


}


export default RenderSongPage;
