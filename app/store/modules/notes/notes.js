import * as noteActions from './actions'
import { ADD_NOTE } from './actions';

// note action creators

const addNote = note => (
  {
    type: noteActions.ADD_NOTE,
    note,
  }
)

// initial state for notes
const initialState = {
  isFetching: false,
  error: '',
}

// note reducer

const notes = (state = initialState, action) => {
  switch (action.type) {
  case noteActions.ADD_NOTE:
    return {
      ...state,
      error: '',
      isFetching: '',
      [action.note.noteId]: action.note,
    }
  default:
    return {
      ...state,
    }
  }
}

export default notes
