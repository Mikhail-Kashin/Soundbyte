import { fetch } from './csrf.js';


const SONG_FEED = 'SONG_FEED'
const ADD_SONG = 'ADD_SONG'
const REMOVE_SONG = 'REMOVE_SONG'


const getSongFeed = (songs) => ({
  type: SONG_FEED,
  payload: songs
})


const addSong = (song) => ({
  type:ADD_SONG,
  payload:song
})

const removeSong = (song) => ({
  type:REMOVE_SONG,
  payload:song
})

//thunks
export const getSongs = () => async dispatch => {
  const res = await fetch(`/api/songs`)
  if (!res.ok){
    throw res
  }
  const song = await res.data
  await dispatch(getSongFeed(song))
}

//AWS create song thunk
export const createSong = (newSong) => async dispatch => {
  const {userId, songUrl, songName, songGenre} = newSong;
  const formData = new FormData();
  formData.append("songName", songName);
  formData.append("songGenre", songGenre);
  formData.append("userId", userId);
  console.log('testing newSONG', newSong)
  if (songUrl) formData.append('songUrl', songUrl);

  const res = await fetch(`/api/songs/new`, {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  })
  console.log('testing......songData', res)
  const songData = await res.data
  await dispatch(addSong(songData))
}


//delete song Thunks
export const deleteSong = (songId) => async dispatch => {
  const res = await fetch(`api/songs/delete/${songId}`, {
    headers: { 'Content-Type': 'application/json'},
    method: 'DELETE'
  })
  const songData = await res.data
  if(!res.ok){
    return;
  };
  await dispatch(removeSong(songData));
}



const initialState = {}

export default function songReducer(state = initialState, action) {
  switch (action.type) {
    case SONG_FEED:
      const newState = {...action.payload}
      return newState
    case ADD_SONG:
      let newSongState = Object.assign({}, state)
      newSongState[action.payload.id] = action.payload
      return newSongState
    case REMOVE_SONG:
      const removeState = {...state.payload}
      for (const key in state.payload) {
        delete removeState[key]
      }
    default:
      return state;
  }
}
