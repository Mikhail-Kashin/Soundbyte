import React, {useState, useEffect} from 'react';
import { getSongs } from '../../store/splashpage';
import { useDispatch, useSelector } from "react-redux";



const AudioPlayer = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const [songIndex, setSongIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  const audio = document.getElementById("audio")

  const songNames = () => {
    return Object.values(songs).map(song => song.songName)
  }

  const songUrls = () => {
    return Object.values(songs).map(song => song.songUrl)
  }

  // console.log('testingasdfa;sdjflk', songs)
  let listSongs = songUrls()

  function playSongs(e) {
    e.preventDefault()
    if (playing === true) {
      setPlaying(false)
      audio.play()
    } else {
      setPlaying(true)
      audio.pause()
    }
  }

  function prevSong(e){
    e.preventDefault()
    if (songIndex > 0){
      setSongIndex(songIndex -1)
    }else {
      setSongIndex(listSongs.length - 1)
    }
  }

  function nextSong(e){
    e.preventDefault()
    if (songIndex < listSongs.length - 1) {
      setSongIndex(songIndex + 1)
    }else {
      setSongIndex(0)
    }
  }

  if (audio) {
    audio.addEventListener('ended', function() {
      if (songIndex < listSongs.length - 1) {
        setSongIndex(songIndex + 1)
      } else setSongIndex(0)
    })}

    useEffect(() => {
      dispatch(getSongs())
    },[dispatch])

    useEffect(() => {
      if (audio) audio.play()
    }, [songIndex, audio])



	return (
    <>
      <div>
        <button onClick={e => prevSong(e)}>Previous</button>
        {playing === true ? <button onClick={e => playSongs(e)}>Play</button> : <button onClick={e => playSongs(e)}>Pause</button>}
        <button onClick={e => nextSong(e)}>Next</button>
      </div>
      <p>
        <audio
          id='audio'
          src={listSongs[songIndex]}
        />
      </p>
    </>
    );
}

export default AudioPlayer;
