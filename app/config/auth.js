import firebase from 'firebase'
import { firebaseAuth, ref } from './firebaseConfig'

export function authenticate () {
  return firebaseAuth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
}

// save user to firebase
export function saveUser (user) {
  return ref.child(`users/${user.userId}`)
    .set(user)
    .then(() => user)
}
