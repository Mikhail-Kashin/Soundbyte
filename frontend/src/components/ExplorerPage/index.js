import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AudioPlayer from '../SplashPage/audioPlayer'
import '../SplashPage/splashPage.css';
import SideBar from '../SplashPage/sidebar'
import {LogOutComponent} from '../SplashPage/logoutbutton'
import { RenderSongPage } from '../SplashPage/renderSongPage'
import { getExploreSongs } from '../../store/explore'


function ExplorerSongPage () {
  // const sessionUser = useSelector(state => state.session.user);
  // const userSongs = useSelector(state => state.songs)
  const dispatch = useDispatch();

  // function renderSongNamesOtherUsers(){
  //   return Object.values(songs).map(song => {
  //     return (
  //       <div>
  //         <span className="songNum"> {songIndexNum(song.songUrl)}. </span>
  //         <span onClick={(e) => dispatch(audioController(song.id))}> {song.songName} </span>
  //         <span onClick={(e) => removeSongFunc(e, song.id)} id='removeSong' i class="fas fa-backspace"></span>
  //       </div>
  //     )
  //   })
  // }

  useEffect(() => {
    dispatch(getExploreSongs())
  },[dispatch])


  return (
    <div class="grid-container-explore">
      <div class="Header">
        <div className='uploadlogout'>
            <LogOutComponent/>
        </div>
        <div>
          <p className="yourSongs">Explore Songs!</p>
        </div>
      </div>
      <div class="MainBody">
          <RenderSongPage/>
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
}

export default ExplorerSongPage
