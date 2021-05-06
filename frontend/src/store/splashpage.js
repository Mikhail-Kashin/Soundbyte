import { fetch } from './csrf.js';


const SONG_FEED = 'SONG_FEED'
const ADD_SONG = 'ADD_SONG'


const getSongFeed = (songs) => ({
  type: SONG_FEED,
  payload: songs
})


const addSong = (song) => ({
  type:ADD_SONG,
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

//AWSTHUNK
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


//working code NONAWSTHUNK
// export const createSong = (newSong) => async dispatch => {
//   const {songUrl, songName, songGenre} = newSong;
//   // console.log('testing newSONG', newSong)
//   const res = await fetch(`/api/songs/new`, {
//     method: 'POST',
//     body: JSON.stringify({
//       songUrl,
//       songName,
//       songGenre
//     }),
//   })
//   const songData = await res.data
//   console.log('testing......songData', res.data)
//   await dispatch(addSong(songData))
// }



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
    default:
      return state;
  }
}
