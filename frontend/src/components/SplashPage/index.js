import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getSongs, createSong } from '../../store/splashpage';
import { Modal } from '../../context/Modal'
import RenderNewSongForm from './newsongform'
import './splashPage.css';

function SongPage() {
  // const history = useHistory(); // so that we can redirect after the image upload is successful
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);





  useEffect(() => {
    dispatch(getSongs())

  },[dispatch])



const renderSongPage = () => {
  if (sessionUser){
    return Object.values(songs).map(song => {

      return (
        <div>
          <p>{song.songName}</p>
        </div>
      )

    })
  }
  }

return (
  <div>
    <p className="yourSongs">Your Songs</p>
    <div>
      {renderSongPage()}
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

}

export default SongPage;
