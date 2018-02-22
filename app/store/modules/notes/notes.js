import * as noteActions from './actions'
import { fetchNotes, saveNoteToFirebase } from '../../../helpers/api'
import { addSingleUserNote } from '../userNotes/userNotes'

// note action creators

const addNote = note => (
  {
    type: noteActions.ADD_NOTE,
    note,
  }
)

const fetchingNotes = () => ({
  type: noteActions.FETCHING_NOTES,
})

const fetchingNotesSuccess = (notes) => ({
  type: noteActions.FETCHING_NOTES_SUCCESS,
  notes,
})

const fetchingNotesFailure = (error) => ({
  type: noteActions.FETCHING_NOTES_FAILURE,
  error,
})

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

export const fetchAllNotes = () => dispatch => {
  dispatch(fetchingNotes())
  return fetchNotes()
    .then((notes) => {
      console.log('note objects', notes)
      return dispatch(fetchingNotesSuccess(notes))
    })
    .catch((error) => (dispatch(fetchingNotesFailure(error))))
}

// initial state for notes
const initialState = {
  isFetching: false,
  error: '',
  noteFeed: [],
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
  case noteActions.FETCHING_NOTES:
    return {
      ...state,
      isFetching: true,
    }
  case noteActions.FETCHING_NOTES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      noteFeed: action.notes,
    }
  default:
    return state
  }
}
