import React, {useState, useEffect} from 'react';
import { getSongs } from '../../store/splashpage';
import { useDispatch, useSelector } from "react-redux";



const AudioPlayer = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const [songIndex, setSongIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  const audio = document.getElementById("audio")
  const progressBar = []


  if(audio){
    // console.log('testingasdfa;sdjflk', audio.currentTime)
    console.log('testingasdfa;sdjflk', playBarValue())
  }

  //formates time into hours and seconds.
  function timeFormater(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10 ){
      sec = `0${sec}`;
    }
    return `${min}:${sec}`
  }

  //updates bar with length of currently played song
  function playBarValue(){
    if (audio){
      progressBar.max = audio.duration
      progressBar.value = timeFormater(audio.currentTime)
      // console.log(progressBar.value)
    }
  }


  const songNames = () => {
    return Object.values(songs).map(song => song.songName)
  }

  const songUrls = () => {
    return Object.values(songs).map(song => song.songUrl)
  }


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

  // function timeDisplay(){
  //   if(audio){
  //     audio.addEventListener('currentTime', function(){
  //       let time = audio.currentTime
  //       return (time)
  //     })
  //   }
  // }


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
    }, [songIndex])



	return (
    <>
      <div>
        <span id='previousSong' i class="fas fa-step-backward" onClick={e => prevSong(e)}></span>
        {playing === true ? <span id='playButton' i class="fas fa-play-circle" onClick={e => playSongs(e)}></span> : <span id='pauseButton' i class="far fa-pause-circle" onClick={e => playSongs(e)}></span>}
        <span id='nextSong' i class="fas fa-step-forward" onClick={e => nextSong(e)}></span>
      </div>
      <p>
        <audio
          id='audio'
          src={listSongs[songIndex]}
        />
            </p>
        <div class="currentTime"></div>
        <input
            type="range"
            id="progress-bar"
            min="0"
            max=""
            value="0"
            onchange={playBarValue()}
        />
        <div class="durationTime"></div>
    </>
    );
}

export default AudioPlayer;
