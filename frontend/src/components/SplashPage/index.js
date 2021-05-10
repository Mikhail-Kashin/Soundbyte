import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from '../../context/Modal'
import RenderNewSongForm from '../NewSongForm/newsongform'
import AudioPlayer from './audioPlayer'
import './splashPage.css';
import SideBar from './sidebar'
import {LogOutComponent} from './logoutbutton'
import { RenderSongPage } from './renderSongPage'
import LoginFormModal from'../LoginFormModal'
import SignupFormPage from '../SignupFormPage'



function SongPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  // const userId = sessionUser.id

  // Object.values(songs)

  // useEffect(() => {
  //   if(sessionUser)
  //   console.log('test...>>>>>>>>test',sessionUser.id)
  // },[dispatch,sessionUser])


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
} else {
  return (
    <div class="grid-container">
      <div class="Header">
      </div>
      <div class="MainBody">
          <div><LoginFormModal/>  <span id='uploadIcon' onClick={() => setShowModal(true)}>Sign Up!</span>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <SignupFormPage />
              </Modal>
            )} </div>
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



    // <div>
    //   <div>
    //     <span className="welcomeBanner">Welcome to SoundByte</span>
    //     <LoginFormModal/>
    //   </div>
    // </div>
  )
}

}

export default SongPage;
