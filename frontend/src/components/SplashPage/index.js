import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from '../../context/Modal'
import RenderNewSongForm from './newsongform'
import AudioPlayer from './audioPlayer'
import './splashPage.css';
import Navigation from '../Navigation/index'
import {LogOutComponent} from '../Navigation/logoutbutton'
import { RenderSongPage } from './renderSongPage'



function SongPage() {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);



if (sessionUser){
  return (
    <div class="grid-container">
      <div class="Header">
        <LogOutComponent/>
        <div>
          <p className="yourSongs">Your Songs</p>
        </div>
        <span id='uploadIcon' className="far fa-plus-square icon" onClick={() => setShowModal(true)}></span>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <RenderNewSongForm />
            </Modal>
          )}
      </div>
      <div class="MainBody">
          {RenderSongPage()}
      </div>
      <div class="MediaPlayer">
          {AudioPlayer()}
      </div>
      <div class="SideBar">
          <span><Navigation/></span>
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
