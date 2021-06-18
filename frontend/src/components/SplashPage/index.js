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
import DemoLogin from '../LoginFormModal/demoLogin'



function SongPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  const [currentlyPlaying, setCurrentlyPlaying] = useState('')
  const [currentTrackPicture, setCurrentTrackPicture] = useState('')
  const [flag, setFlag] = useState(false)
  const songs = useSelector(state => state.songs)
  // const userId = sessionUser.id

  // Object.values(songs)

  let audio = document.getElementById("audio")

  let test = ''

  if (audio){
    test = audio.src
  }


  useEffect(() => {
    if(sessionUser)
    console.log('test...>>>>>>>>test',sessionUser.id)
  },[dispatch,sessionUser])

  useEffect(() =>{
    if (audio){
      songsLoop()
    }
  },[test])


  const songsLoop = () => {
    Object.values(songs).map(song => {
      if (audio && song.songUrl === audio.src){
        setCurrentTrackPicture(song.albumPicUrl)
        return setCurrentlyPlaying(song.songName)
      }
    })
  }

if (sessionUser){
  return (
    <div class="grid-container">
      <div class="Header">
        <div className='uploadlogout'>
          <span id='uploadIcon' className="far fa-plus-square icon" onClick={() => setShowModal(true)}></span>
            {showModal && (
              <Modal onClose={() => setShowModal(false)} >
                <RenderNewSongForm onSubmit={() => setShowModal(false)}/>
              </Modal>
            )}
            <LogOutComponent/>
        </div>
          <p className="yourSongs">your music</p>
          <div className="pic-and-name">
            <p className="currentlyPlayingSong">{currentlyPlaying}</p>
            <p ><img src={currentTrackPicture} className="currentlyTrackPicture"></img></p>
          </div>
      </div>
      <div class="MainBody">
        <div className="headings"><span className='songNumHeader'># </span><span>Title</span></div>
        <div>
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
    <div className='splashPagePic'>
      <div className='boxLoggedOut'>
        <div className='boxContentLoggedOut'>
          <div className='welcomeBanner'>welcome to SoundByte!
            <div>your personal cloud music player</div>
          </div>
          <div className='LoginSignUp'>
                <DemoLogin/>
                <span id='logInSplash'><LoginFormModal/>  <button  onClick={() => setShowModal(true)} id='signUpSplash'>Sign Up</button>
                  {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                      <SignupFormPage />
                    </Modal>
                  )} </span>
          </div>
        </div>
      </div>
    </div>
  )
}

}

export default SongPage;
