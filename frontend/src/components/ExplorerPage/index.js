import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from '../../context/Modal'
import RenderNewSongForm from '../NewSongForm/newsongform'
import AudioPlayer from '../SplashPage/audioPlayer'
import '../SplashPage/splashPage.css';
import SideBar from '../SplashPage/sidebar'
import {LogOutComponent} from '../SplashPage/logoutbutton'
import { RenderSongPage } from '../SplashPage/renderSongPage'
import LoginFormModal from'../LoginFormModal'
import SignupFormPage from '../SignupFormPage'

function ExplorerSongPage () {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);



  return (
    <div class="grid-container">
      <div class="Header">
        <div className='uploadlogout'>
            <LogOutComponent/>
        </div>
        <div>
          <p className="yourSongs">Explore Song Uploaded by Other Users!</p>
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
