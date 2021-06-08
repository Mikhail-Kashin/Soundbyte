import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExploreSongs } from '../../store/explore'
import { audioController } from '../../store/audiocontroller'
import '../SplashPage/splashPage.css';


export const RenderExplorerSongPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userSongs = useSelector(state => state.songs)
  const clickedSongUrl = useSelector(state => state.audioReducer.clickedSong)
  const [audioSrc, setAudioSrc] = useState('')
  const [listSongs, setListSongs] = useState([])
  // console.log(songs)

    //grabs audio html tag
    const audio = document.getElementById("audio")

    const songUrls = () => {
      let list = [];
      Object.values(userSongs).map(userSong =>{
        if (userSong.userId !== sessionUser.id){
          list.push(userSong.songUrl)
        }
      } )
      return list
    }

    useEffect(() => {
      if (audio){
        setAudioSrc(audio.src)
      }
    },[songUrls(), clickedSongUrl, audioSrc])

    useEffect(() => {
      setListSongs(songUrls())
      setAudioSrc(audio.src)
    // console.log('test...>>>>>>>>test', sessionUser.id)
  },[dispatch,sessionUser, clickedSongUrl])


  function songIndexNum(songUrl) {
    let list = listSongs
    for (let i = 0; i < list.length; i++) {
      let url = list[i]
      if (url === songUrl){
        return i + 1
      }
    }
  }

  useEffect(() => {
    dispatch(getExploreSongs())
    renderSongNamesOtherUsers()
  },[dispatch, clickedSongUrl])


  function renderSongNamesOtherUsers(){
    if(!sessionUser){
      return
    }
    return Object.values(userSongs).map(userSong => {
      if (userSong.userId !== sessionUser.id){
        return (
          <div className='songDiv'>
            <div className="songLists">
              <span className="songNum"> {songIndexNum(userSong.songUrl)}. </span>
              {/* <span onClick={(e) => dispatch(audioController(userSong.songUrl))}> <div className="songNames">{userSong.songName}</div> </span> */}
              <span onClick={() => dispatch(audioController(userSong.songUrl))}> {audioSrc === userSong.songUrl ? <div className="songNames" id='songIdExplorer'> {userSong.songName} </div>:  <div className="songNames"> {userSong.songName}</div>} </span>

            </div>
          </div>
        )
      }
    })
  }

  return (
    <div>
      <div>{renderSongNamesOtherUsers()}</div>
    </div>
  )


}


export default RenderExplorerSongPage;
