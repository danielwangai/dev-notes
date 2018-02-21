import { ref } from '../config/firebaseConfig'

// add noteId to note
const completeNote = ({note, noteId}) => ({
  ...note,
  noteId,
})

const saveToNotes = note => {
  const noteId = ref.child('notes').push().key
  console.log('note Id\n\n', noteId)
  const notePromise = ref.child(`notes/${noteId}`).set(completeNote({note, noteId: noteId}))
  return {
    noteId,
    notePromise,
  }
}

export const saveToUserNotes = (note, noteId, userId) => (
  ref.child(`userNotes/${userId}/${noteId}`).set(completeNote({note, noteId: noteId}))
)

export const saveNoteToFirebase = (note, userId) => {
  const {noteId, notePromise} = saveToNotes(note)
  return Promise.all([
    notePromise,
    saveToUserNotes(note, noteId, userId),
  ]).then(() => ({...note, noteId}))
}
