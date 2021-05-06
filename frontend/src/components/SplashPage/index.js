import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
// import { useHistory } from "react-router-dom";
import { getSongs, deleteSong } from '../../store/splashpage';
import { Modal } from '../../context/Modal'
import RenderNewSongForm from './newsongform'
import AudioPlayer from './audioPlayer'
import './splashPage.css';




function SongPage() {
  // const history = useHistory(); // so that we can redirect after the image upload is successful
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [songIndex, setSongIndex] = useState(0)


  function removeSongFunc(e, songId){
    e.preventDefault();
    // console.log('test.......>', songId)
    dispatch(deleteSong(songId))
    dispatch(getSongs())
  }


  useEffect(() => {
    dispatch(getSongs())
  },[dispatch])



const renderSongPage = () => {
  if (sessionUser){
    return Object.values(songs).map(song => {

      return (
        <div>
          <p onClick={() => setSongIndex(0)}>{song.songName}</p>
          <button onClick={(e) => removeSongFunc(e, song.id)}>Delete</button>
        </div>
      )

    })
  }
  }
if (sessionUser){
  return (
    <div>
      <p className="yourSongs">Your Songs</p>
      <div>
        {renderSongPage()}
      </div>
      <div>
        {AudioPlayer()}
      </div>
      <div>
      <button onClick={() => setShowModal(true)}>Upload</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <RenderNewSongForm />
          </Modal>
        )}
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
