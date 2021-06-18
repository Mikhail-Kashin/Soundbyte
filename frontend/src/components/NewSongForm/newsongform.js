import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSong } from '../../store/splashpage';
import './newSongForm.css'




const RenderNewSongForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [songUrl, setSongUrl] = useState('');
  const [albumPicUrl, setAlbumPicUrl] = useState('');
  const [songName, setSongName] = useState('');
  const [songGenre, setSongGenre] = useState('');
  const [userId, setUserId] = useState('');

  console.log("albumPicUrlsdfdsfs", albumPicUrl)
  console.log("songUrlsdfdsfs", songUrl)

  //loading use state




  const handleSubmitNewSong = async (e) => {
    e.preventDefault();
    dispatch(createSong({ userId, songUrl, albumPicUrl, songName, songGenre}))
    //set loading to true
      .then(() => {
        setSongUrl(null);
        setAlbumPicUrl(null);
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

  const updateSongFile = (e) => {
    console.log('song', e.target.files)
    const songFile = e.target.files[0];
    if (songFile) setSongUrl(songFile);
  }

  // const updateFiles = (e) => {
  //       const files = e.target.files;
  //       setAlbumPicUrl(files);
  //     };

  const updateAlbumFile = (e) => {
    console.log('album', e.target.files)
    const albumPicFile = e.target.files[0];
    if (albumPicFile) setAlbumPicUrl(albumPicFile);
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
            Album Pic
          <input className="uploadFileButton"
            type="file"
            // value={songUrl}
            onChange={updateAlbumFile}
            required
            />
          </label>

          <label>
            Song File
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
