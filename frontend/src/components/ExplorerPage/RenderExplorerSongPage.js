import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from '../SplashPage/audioPlayer'
import '../SplashPage/splashPage.css';
import SideBar from '../SplashPage/sidebar'
import {LogOutComponent} from '../SplashPage/logoutbutton'
import { getExploreSongs } from '../../store/explore'
import { audioController } from '../../store/audiocontroller'


export const RenderExplorerSongPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userSongs = useSelector(state => state.songs)


  const [listSongs, setListSongs] = useState([])
  // console.log(songs)


  useEffect(() => {
    const songUrls = () => {
      let list = [];
      Object.values(userSongs).map(userSong =>{
        if (userSong.userId !== sessionUser.id){
          list.push(userSong.songUrl)
        }
      } )
      return list
    }
    setListSongs(songUrls())
    // console.log('test...>>>>>>>>test', sessionUser.id)
  },[dispatch,sessionUser])


  function songIndexNum(songUrl) {
    let list = listSongs
    for (let i = 0; i < list.length; i++) {
      let url = list[i]
      if (url === songUrl){
        return i + 1
      }
    }
  }
  // console.log(songIndexNum())

  useEffect(() => {
    // console.log('test...>>>>>>>>test',sessionUser.id)
  },[dispatch,sessionUser])

  useEffect(() => {
    dispatch(getExploreSongs())
  },[dispatch])

  useEffect(() => {
    // console.log('test...>>>>>>>>test',sessionUser.id)
  },[dispatch,sessionUser])

  
  function renderSongNamesOtherUsers(){

    return Object.values(userSongs).map(userSong => {
      if (userSong.userId !== sessionUser.id){
        return (
          <div>
            <span className="songNum"> {songIndexNum(userSong.songUrl)}. </span>
            <span onClick={(e) => dispatch(audioController(userSong.id))}> {userSong.songName} </span>
          </div>
        )
      }
    })
  }

  return (
    <div>
      <div className="headings"><span>#</span><span>title</span><span>Delete</span></div>
      <div>{renderSongNamesOtherUsers()}</div>
    </div>
  )


}


export default RenderExplorerSongPage;
