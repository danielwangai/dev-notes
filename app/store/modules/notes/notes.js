import * as noteActions from './actions'
import { saveNoteToFirebase } from '../../../helpers/api'
import { addSingleUserNote } from '../userNotes/userNotes'

// note action creators

const addNote = note => (
  {
    type: noteActions.ADD_NOTE,
    note,
  }
)

// thunks

export const saveNote = (note) => (dispatch, getState) => {
  const userId = getState().users.authenticatedUserId
  saveNoteToFirebase(note, userId)
    .then((noteWithId) => {
      dispatch(addNote(noteWithId))
      dispatch(addSingleUserNote(noteWithId.noteId))
    })
    .catch((error) => {
      console.warn('Error on save notes', error)
    })
}

// initial state for notes
const initialState = {
  isFetching: false,
  error: '',
}

// note reducer

export const notes = (state = initialState, action) => {
  switch (action.type) {
  case noteActions.ADD_NOTE:
    return {
      ...state,
      error: '',
      isFetching: '',
      [action.note.noteId]: action.note,
    }
  default:
    return state
  }
}
