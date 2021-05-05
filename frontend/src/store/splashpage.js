import { fetch } from './csrf.js';

const SONG_FEED = 'SONG_FEED'

const getSongFeed = (songs) => ({
  type: SONG_FEED,
  payload: songs
})


//thunk
export const getSongs = () = async dispatch => {
  const res = await fetch('/api/songs')
  if (!res.ok){
    throw res
  }
  const song = await res.json()
  dispatch(getSongFeed(song))
}



const initialState = {}

export default function songReducer(state = initialState, action) {
  switch (action.type) {
    case SONG_FEED:
      const newState = {...action.payload}
      return newState
    default:
      return state;
  }
}
