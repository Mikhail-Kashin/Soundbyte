import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from '../../context/Modal'
import RenderNewSongForm from './newsongform'
import AudioPlayer from './audioPlayer'
import './splashPage.css';
import SideBar from './sidebar'
import {LogOutComponent} from './logoutbutton'
import { RenderSongPage } from './renderSongPage'



function SongPage() {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);



if (sessionUser){
  return (
    <div class="grid-container">
      <div class="Header">
        <div className='uploadlogout'>
          <span id='uploadIcon' className="far fa-plus-square icon" onClick={() => setShowModal(true)}></span>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <RenderNewSongForm />
              </Modal>
            )}
            <LogOutComponent/>
        </div>
        <div>
          <p className="yourSongs">Your Songs</p>
        </div>
      </div>
      <div class="MainBody">
        <div class="RendorSongPageWrapper">
          <RenderSongPage/>
        </div>
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
} else {
  return (
    <p className="yourSongs">Please Login</p>
  )
}

}

export default SongPage;
