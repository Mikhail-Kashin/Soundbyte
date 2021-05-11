import React, {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from '../../store/splashpage';



export const AudioPlayer = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const sessionUser = useSelector(state => state.session.user);
  const songId = useSelector(state => state.audioReducer.clickedSong)
  const [songIndex, setSongIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [listSongs, setListSongs] = useState([])
  const [currentSongDuration, setCurrentSongDuration] = useState('')
  const [currentPlayingDuration, setCurrentPlayingDuration] = useState('')
  const [initialSongDuration, setInitialSongDuration] = useState(null)
  const [initialPlayingDuration, setInitialPlayingDuration] = useState(null)
  const [audioLoad, setAudioLoad] = useState(null)


  const myRef = useCallback(node => {
    if (node){
      setAudioLoad(node)
    }
  })

  const audio = document.getElementById("audio")


  function updateBar() {
    if (audio) {
      let canvas = document.getElementById('my-canvas').getContext('2d')
      let canvasWidth = 500
      let ctrl = document.getElementById('audioControl')
      canvas.clearRect(0, 0, canvasWidth, 50);
      canvas.fillStyle = '#000000';
      canvas.fillRect(0, 0, canvasWidth, 50);

      if (audio.currentTime === audio.duration) {
        ctrl.innerHTML = 'Play'
      }

      timeFormater(audio.currentTime)

      let percentage = audio.currentTime / audio.duration
      let progress = (canvasWidth * percentage)
      canvas.fillStyle = "#FF0000"
      canvas.fillRect(0, 0, progress, 50)
    }
    }
    // useEffect(() => {
    //   updateBar()
    // }, [audio.duration])
    // audiobar setup


  let { explore } = useParams()

  // console.log("a;skdfjlka;s", explore)


  // let progress = document.getElementById('progress');



  // const songsJson = JSON.stringify(songs)
  // console.log('songid', songsJson)
  // console.log('sdfjkl;adsjf', songsJson.id)


  const songNames = () => {
    return Object.values(songs).map(song => song.songName)
  }



  useEffect(() => {
    const songUrls = () => {
      let list = [];
      Object.values(songs).map(song =>{
        if (explore){
          if (song.userId !== sessionUser.id){
            list.push(song.songUrl)
          }
        } else {
          if (song.userId === sessionUser.id){
            list.push(song.songUrl)
          }
        }
      } )
      return list
    }
    setListSongs(songUrls())
    // console.log('test...>>>>>>>>test', sessionUser.id)
  },[dispatch,sessionUser])




  // let songData= {}
  // songs.map((song) => (songData[song.id] = song))
  // console.log('songDatatest',songData) // should print out what you're looking for






  if(songId){

  }

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



    // useEffect(() => {
    //   setAudioLoad(audio)
    // },[audio])

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
          <canvas id="my-canvas" width="300" height="20">
          </canvas>
        </p>
      <p>
        <audio
          ref={myRef}
          id='audio'
          src={listSongs[songIndex]}
          ontimeupdate={updateBar()}
          />
            </p>
      {/* <div id="progress">
        <div id="bar"></div>
      </div> */}
      <div className="currentDuration">{currentDuration()}</div>
      <div className="songDuration">{songDuration()}</div>
    </>
    );
}

export default AudioPlayer;
