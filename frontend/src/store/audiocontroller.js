
const CHANGE_SONG = 'CHANGE_SONG'
const SONGNAME_AND_URL = 'SONGNAME_AND_URL'

const newSong = (song) => ({
  type:CHANGE_SONG,
  payload: song
})

const songurlAndName = (song) => ({
  type:SONGNAME_AND_URL,
  payload: song
})



export const audioController = (id, songUrl) => async dispatch => {
  dispatch(newSong(id, songUrl))
}

export const songUrlplusname = (songUrl, name) => async dispatch => {
  dispatch(songurlAndName(songUrl, name))
}

const initialState = {}

export default function audioReducer(state = initialState, action){
  switch (action.type){
    case CHANGE_SONG:
      const newState = {clickedSong: action.payload}
    return newState
    case SONGNAME_AND_URL:
      const info = {...action.payload}
      return info
    default:
      return state
  }
}
