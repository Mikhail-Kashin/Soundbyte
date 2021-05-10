import React from "react";
import AudioPlayer from '../SplashPage/audioPlayer'
import '../SplashPage/splashPage.css';
import SideBar from '../SplashPage/sidebar'
import {LogOutComponent} from '../SplashPage/logoutbutton'

import RenderExplorerSongPage from './RenderExplorerSongPage'


function ExplorerSongPage () {


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
}

export default ExplorerSongPage
