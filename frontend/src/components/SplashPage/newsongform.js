import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSong } from '../../store/splashpage';




const RenderNewSongForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [songUrl, setSongUrl] = useState('');
  const [songName, setSongName] = useState('');
  const [songGenre, setSongGenre] = useState('');


  const handleSubmitNewSong = async (e) => {
    e.preventDefault();
    dispatch(createSong({ songUrl, songName, songGenre}))
      .then(() => {
        setSongUrl(null);
        setSongName('');
        setSongGenre('');
      })
      // .catch(async (res) => {
      //   const data = await res.json();
      // })
  }

  const updateSongFile = (e) => {
    const songFile = e.target.files[0];
    // console.log('testsongfil')
    if (songFile) setSongUrl(songFile);
  }

  if (sessionUser){
    return (
      <div>
        <form onSubmit={handleSubmitNewSong}>
          <label>
            songName
            <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            placeholder="songname"
            required
            />
          </label>
          <label>
            uploadhere
            <input
            type="file"
            // value={songUrl}
            onChange={updateSongFile}
            required
            />
          </label>
          <button type="submit" >Upload New Song!</button>
        </form>
      </div>
    )
  }
  }

export default RenderNewSongForm;
