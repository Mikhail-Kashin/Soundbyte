import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSong } from '../../store/splashpage';
import './newSongForm.css'




const RenderNewSongForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [songUrl, setSongUrl] = useState('');
  const [songName, setSongName] = useState('');
  const [songGenre, setSongGenre] = useState('');
  const [userId, setUserId] = useState('');

  //loading use state




  const handleSubmitNewSong = async (e) => {
    e.preventDefault();
    dispatch(createSong({ userId, songUrl, songName, songGenre}))
    //set loading to true
      .then(() => {
        setSongUrl(null);
        setSongName('');
        setSongGenre('');
        setUserId('');
        //set loading false
      })
      // .catch(async (res) => {
      //   const data = await res.json();
      // })
  }

  useEffect(() => {
    setUserId(sessionUser.id)
  },[dispatch,sessionUser])
5
  const updateSongFile = (e) => {
    const songFile = e.target.files[0];
    // console.log('testsongfil')
    if (songFile) setSongUrl(songFile);
  }

  if (sessionUser){
    return (
      <div className="newSongWrapper">
        <form onSubmit={handleSubmitNewSong}>
          <span className="newSongBanner">Upload New Song!</span>
          <label>
            Song Name
            <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            placeholder="Enter Song Name"
            required
            />
          </label>
          <label>
            <input className="uploadFileButton"
            type="file"
            // value={songUrl}
            onChange={updateSongFile}
            required
            />
          </label>
          <button className="newSongButton" type="submit" >Submit!</button>
        </form>
      </div>
    )
  }
  }

export default RenderNewSongForm;
