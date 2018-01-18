import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBa-FjffOTEo6KMbmjzoaz98KH5_zGxbm0',
  authDomain: 'dev-notes-f4ad0.firebaseapp.com',
  databaseURL: 'https://dev-notes-f4ad0.firebaseio.com',
  projectId: 'dev-notes-f4ad0',
  storageBucket: 'dev-notes-f4ad0.appspot.com',
  messagingSenderId: '177784492515',
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
