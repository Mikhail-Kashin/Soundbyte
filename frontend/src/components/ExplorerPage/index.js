import React, { useEffect, useState } from "react";
import AudioPlayer from '../SplashPage/audioPlayer'
import '../SplashPage/splashPage.css';
import SideBar from '../SplashPage/sidebar'
import {useSelector, useDispatch} from "react-redux"
import {LogOutComponent} from '../SplashPage/logoutbutton'
import {useHistory} from 'react-router-dom'
import RenderExplorerSongPage from './RenderExplorerSongPage'


function ExplorerSongPage () {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const [currentlyPlaying, setCurrentlyPlaying] = useState('')
  const [currentTrackPicture, setCurrentTrackPicture] = useState('')
  const clickedSongUrl = useSelector(state => state.audioReducer.clickedSong)
  const songs = useSelector(state => state.songs)
  const notLoggedIn = () => {
    history.push('/');
  }

  let audio = document.getElementById("audio")

  let test = ''

  if (audio){
    test = audio.src
  }

  useEffect(() =>{
    if (audio){
      songsLoop()
    }
  },[test, clickedSongUrl])

  const songsLoop = () => {
    Object.values(songs).map(song => {
      if (audio && song.songUrl === audio.src){
        setCurrentTrackPicture(song.albumPicUrl)
        return setCurrentlyPlaying(song.songName)
      }
    })
  }


  if(sessionUser){
    return (
      <div class="grid-container-explore">
        <div class="Header">
          <div className='uploadlogout'>
              <LogOutComponent/>
          </div>
          <div>
            <p className="yourSongs">explore songs</p>
            <div className="pic-and-name">
            <p className="currentlyPlayingSong">{currentlyPlaying}</p>
            <p >{currentTrackPicture ? <img src={currentTrackPicture}  class='currentTrackPicture'></img> : <img src='https://user-images.githubusercontent.com/75585372/122488680-fadbd400-cfab-11eb-9c62-a13dd40295c1.jpg'  class='currentTrackPicture'></img>}</p>
          </div>
          </div>
        </div>
        <div class="MainBody">
        <div className="headings"><span className='songNumHeader'>#</span><span>Title</span></div>
            <RenderExplorerSongPage/>
        </div>
        <div class="MediaPlayer">
            <AudioPlayer/>
        </div>
        <div class="SideBar">
          <div class="sideBarWrapper">
            <span><SideBar/></span>
          </div>
        </div>
      </div>
    )
  }else{
    return(
    <div>
      <h1>please login</h1>
      {notLoggedIn()}
    </div>
    )
  }
}

export default ExplorerSongPage
