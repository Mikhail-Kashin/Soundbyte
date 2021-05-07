import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, deleteSong } from '../../store/splashpage';


export const RenderSongPage = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const [songIndex, setSongIndex] = useState(0)

  console.log(songIndex)

  function removeSongFunc(e, songId){
    e.preventDefault();
    // console.log('test.......>', songId)
    dispatch(deleteSong(songId))
    dispatch(getSongs())
  }


  useEffect(() => {
    dispatch(getSongs())
  },[dispatch])


  return Object.values(songs).map(song => {
    return (
      <div>
        <p onClick={() => setSongIndex(0)} className="SongNames">{song.songName}
        <p onClick={(e) => removeSongFunc(e, song.id)} id='removeSong' i class="fas fa-backspace"></p>
        </p>
      </div>
    )
  })
}


export default RenderSongPage;