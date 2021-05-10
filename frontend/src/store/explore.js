import { fetch } from './csrf.js';

const EXPLORE_SONG_FEED = 'EXPLORE_SONG_FEED'


const getExploreSongFeed = (songs) => ({
  type: EXPLORE_SONG_FEED,
  payload: songs
})


//thunks
export const getSongs = () => async dispatch => {
  const res = await fetch(`/api/explore`)
  if (!res.ok){
    throw res
  }
  const song = await res.data
  await dispatch(getExploreSongFeed(song))
}

const initialState = {}


export default function ExploreSongReducer(state = initialState, action) {
  switch (action.type) {
    case EXPLORE_SONG_FEED:
      const newState = {...action.payload}
      return newState
    default:
      return state;
  }
}
