import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSongs, createSong } from '../../store/splashpage';
import { fetch } from '../../store/csrf';
import './splashPage.css';

function SongPage() {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs)
  const sessionUser = useSelector(state => state.session.user);
  const [songUrl, setSongUrl] = useState('');
  const [songName, setSongName] = useState('');
  const [songGenre, setSongGenre] = useState('');




  useEffect(() => {
    dispatch(getSongs())

  },[dispatch])


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

const renderNewSongForm = () => {
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
          <button type="submit">Upload New Song!</button>
        </form>
      </div>
    )
  }
  }

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
      {renderNewSongForm()}
    </div>
  </div>
)

}

export default SongPage;
