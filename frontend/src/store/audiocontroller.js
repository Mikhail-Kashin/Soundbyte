
const CHANGE_SONG = 'CHANGE_SONG'

const newSong = (song) => ({
  type:CHANGE_SONG,
  payload: song
})

export const audioController = (id) => async dispatch => {
  dispatch(newSong(id))
}


const initialState = {}

export default function audioReducer(state = initialState, action){
  switch (action.type){
    case CHANGE_SONG:
      const newState = {clickedSong: action.payload}
    return newState
    default:
      return state
  }
}
