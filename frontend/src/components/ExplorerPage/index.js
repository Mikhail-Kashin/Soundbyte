import React from "react";
import AudioPlayer from '../SplashPage/audioPlayer'
import '../SplashPage/splashPage.css';
import SideBar from '../SplashPage/sidebar'
import {useSelector} from "react-redux"
import {LogOutComponent} from '../SplashPage/logoutbutton'
import {useHistory} from 'react-router-dom'
import RenderExplorerSongPage from './RenderExplorerSongPage'


function ExplorerSongPage () {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const notLoggedIn = () => {
    history.push('/');
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
