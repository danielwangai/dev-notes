import * as userNoteActions from './actions'

// action creators

export const addSingleUserNote = (noteId, userId) => ({
  type: userNoteActions.ADD_SINGLE_USER_NOTE,
  noteId,
  userId,
})

// thunks

// initial state

const initialState = {
  isFetching: false,
  note: null,
}

// reducer

const userNotes = (state = initialState, action) => {
  switch (action.type) {
  case userNoteActions.ADD_SINGLE_USER_NOTE:
    return typeof action.userId === 'undefined' ? state
      : {
        ...state,
        noteIds: state.noteIds.push(action.noteId),
      }
  default:
    return state
  }
}

export default userNotes
