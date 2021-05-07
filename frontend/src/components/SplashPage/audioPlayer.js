import React, {useState, useEffect} from 'react';
import { getSongs } from '../../store/splashpage';
import { useDispatch, useSelector } from "react-redux";



export const AudioPlayer = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const [songIndex, setSongIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  let bar = document.getElementById('bar');
  let progress = document.getElementById('progress');


  const audio = document.getElementById("audio")



  // if(audio){
  //   console.log('testingasdfa;sdjflk', currentDuration())
  //   console.log('testingasdfa;sdjflk', songDuration())
  // }

  //formates time into hours and seconds.
  function timeFormater(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10 ){
      sec = `0${sec}`;
    }
    return `${min}:${sec}`
  }

  function currentDuration(){
    if (audio){
      return timeFormater(audio.currentTime)
    }
  }

  function songDuration(){
    if (audio){
      return timeFormater(audio.duration)
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

  if (audio) {
    audio.addEventListener('timeupdate', function(){
      bar.style.width = parseInt(((audio.currentTime / audio.duration) * 100), 10) + "%";
    })
  }

  // if (audio) {
  //   progress.addEventListener('click', function(e){
  //     let clickPosition = (e.pageX - this.offsetLeft) / this.offsetWidth;
  //     let clickTime = clickPosition * audio.duration
  //     audio.currentTime =clickTime;
  //   })
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

    // useEffect(() => {
    //   if (audio){
    //   }
    // },[document.querySelector('.currentTime').innerHTML])



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
      <div id="progress">
        <div id="bar"></div>
      </div>
      <div className="currentDuration">{currentDuration()}</div>
      <div className="songDuration">{songDuration()}</div>
    </>
    );
}

export default AudioPlayer;
