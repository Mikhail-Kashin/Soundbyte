import React, {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from '../../store/splashpage';


export const AudioPlayer = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const sessionUser = useSelector(state => state.session.user);
  const clickedSongUrl = useSelector(state => state.audioReducer.clickedSong)
  const [songIndex, setSongIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [listSongs, setListSongs] = useState([])
  const [currentTime, setCurrentTime] = useState('0:00')


  const { explore } = useParams()

  const audio = document.getElementById("audio")
  // console.log('testingcurrenttime', currentTime)

  console.log('clickedsongUrl', clickedSongUrl)
  console.log('songindex', songIndex)

  const clickedSong = (arr) => {
    arr = listSongs
    console.log('songsArray', listSongs)
    for (let i = 0; i < arr.length; i++){
      console.log('testing arr, clickedsong', arr[i], clickedSongUrl)
      if (arr[i] === clickedSongUrl){
        console.log('clickedSongs was ran!@!!!!')
        return setSongIndex(i)
      } 
    }
  }

  useEffect(() => {
    clickedSong()
  }, [clickedSongUrl])


  function updateBar() {
    if (audio) {
      let canvas = document.getElementById('music-bar').getContext('2d')
      let canvasWidth = 306
      canvas.clearRect(0, 0, canvasWidth, 50);
      canvas.fillStyle = '#000';
      canvas.fillRect(0, 0, canvasWidth, 50);

      let progressBar = document.getElementById('music-bar')
      progressBar.value = (audio.currentTime / audio.duration)
      progressBar.addEventListener("click", seek);


      if (audio.currentTime === audio.duration) {
        playSongs()
      }

      const percentage = audio.currentTime / audio.duration
      const progress = (canvasWidth * percentage)
      canvas.fillStyle = "#b3dfee"
      canvas.fillRect(0, 0, progress, 50)


      function seek(event){
        let percentage = event.offsetX / this.offsetWidth;
        audio.currentTime = percentage * audio.duration
      }

    }
  }



  // console.log("a;skdfjlka;s", explore)



  const songNames = () => {
    return Object.values(songs).map(song => song.songName)
  }


  const songUrls = () => {
    let list = [];
    Object.values(songs).map(song =>{
      if(sessionUser){
        if (explore){
          if (song.userId !== sessionUser.id){
            list.push(song.songUrl)
          }
        } else {
          if (song.userId === sessionUser.id){
            list.push(song.songUrl)
          }
        }
      }
    } )
    return list
  }

  useEffect(() => {
    setListSongs(songUrls())
  },[dispatch,sessionUser,songs])


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
      setCurrentTime(timeFormater(audio.currentTime))
      return timeFormater(audio.currentTime)
    }
  }

  function songDuration(){
    if (audio){
      return timeFormater(audio.duration)
    }
  }


  function playSongs() {
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
      setSongIndex(songIndex - 1)
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
    }, [songIndex])


    function runTimeandStatusBar() {
      updateBar()
      currentDuration()
    }


	return (
    <div>
      <div className="controller-wrap">
      <span className="currentDuration">{ currentTime}</span>
      <span id='previousSong' i class="fas fa-step-backward" onClick={e => prevSong(e)}></span>
      {playing === true ? <span id='playButton' i class="fas fa-play-circle" onClick={e => playSongs(e)}></span> : <span id='pauseButton' i class="far fa-pause-circle" onClick={e => playSongs(e)}></span>}
      <span id='nextSong' i class="fas fa-step-forward" onClick={e => nextSong(e)}></span>
      <span className="songDuration">{songDuration()}</span>
      <p>
        <audio
          id='audio'
          src={listSongs[songIndex]}
          onTimeUpdate={() => runTimeandStatusBar()}

          />
            </p>
    </div>
      <div>
        <canvas id="music-bar" width="300" height="20">
        </canvas>
      </div>

      </div>
    );
}

export default AudioPlayer;
