import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from '../../context/Modal'
import RenderNewSongForm from '../NewSongForm/newsongform'
import AudioPlayer from '../SplashPage/audioPlayer'
import '../SplashPage/splashPage.css';
import SideBar from '../SplashPage/sidebar'
import {LogOutComponent} from '../LoginFormModal'
import { RenderSongPage } from '../SplashPage/renderSongPage'
import LoginFormModal from'../LoginFormModal'
import SignupFormPage from '../SignupFormPage'

function ExplorerSongPage () {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  

  return (
    <div>hello</div>
  )
}

export default ExplorerSongPage
