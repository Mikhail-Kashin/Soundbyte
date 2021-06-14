import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, deleteSong } from '../../store/splashpage';
import { audioController } from '../../store/audiocontroller'

export const RenderSongPage = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const clickedSongUrl = useSelector(state => state.audioReducer.clickedSong)
  const sessionUser = useSelector(state => state.session.user);
  const [audioSrc, setAudioSrc] = useState('')
  const [initialSrc, setInitialSrc] = useState(false)

    //grabs audio html tag
  const audio = document.getElementById("audio")

  if (initialSrc){
    setInitialSrc(true)
    setAudioSrc(audio.src)
  }

  function removeSongFunc(e, songId){
    e.preventDefault();
    dispatch(deleteSong(songId))
    dispatch(getSongs())
  }


  const songUrls = () => {
    let list = [];
    Object.values(songs).map(song =>{
      if (song.userId === sessionUser.id){
        list.push(song.songUrl)
      }
    } )
    return list
  }

  useEffect(() => {
    if (audio){
      setAudioSrc(audio.src)
      setInitialSrc(false)
    }
  },[songUrls(), clickedSongUrl, audioSrc])

  function songIndexNum(songUrl) {
    let list = songUrls()
    for (let i = 0; i < list.length; i++) {
      let url = list[i]
      if (url === songUrl){
        return i + 1
      }
    }
  }
  // console.log(songIndexNum())

  useEffect(() => {
    if (audio){
      setAudioSrc(audio.src)
      setInitialSrc(false)
    }
    dispatch(getSongs())
    renderNames()
  },[dispatch, clickedSongUrl, audioSrc])

  console.log('testisjnetosjfna', audioSrc)

  // useEffect(() => {
  //   console.log('test...>>>>>>>>test',sessionUser.id)
  // },[dispatch,sessionUser])


  function renderNames(){
    return Object.values(songs).map(song => {
      if (song.userId === sessionUser.id){
        return (
          <div className='songDiv'>
            <div className="songLists">
              <div className="songNum"> {songIndexNum(song.songUrl)}. </div>
              <span onClick={() => dispatch(audioController(song.songUrl))}> {audioSrc === song.songUrl ? <div className="songNames" id='songId'> {song.songName} </div>:  <div className="songNames"> {song.songName}</div>} </span>
            </div>
              <div onClick={(e) => removeSongFunc(e, song.id)} id='removeSong' i class="fas fa-backspace"></div>
          </div>
        )
      }
    })
  }

  return (
    <div>
      <div>{renderNames()}</div>
    </div>
  )


}


export default RenderSongPage;
