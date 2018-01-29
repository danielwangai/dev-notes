import {
  AUTHENTICATE_USER, FETCHING_USER,
  FETCHING_USER_FAILURE, FETCHING_USER_SUCCESS,
  REMOVE_FETCHING_USER, UNAUTHENTICATE_USER,
  FETCH_USER_CREDENTIALS_SUCCESS,
  FETCH_USER_CREDENTIALS_FAILURE,
} from './actions'
import { authenticate, logout, saveUser } from '../../../config/auth'
import { formatUserInfo, saveUserToLocalStorage, fetchUserFromLocalStorage, removeUserFromLocalStorage } from '../../../helpers/utils'

// action creators

const fetchingUser = () => (
  {
    type: FETCHING_USER,
  }
)

export const fetchingUserSuccess = (user, timestamp) => (
  {
    type: FETCHING_USER_SUCCESS,
    user,
    timestamp,
  }
)

const fetchingUserFailure = (error) => (
  {
    type: FETCHING_USER_FAILURE,
    error: `Error fetching user.\n\n${error}`,
  }
)

const authenticateUser = (userId) => (
  {
    type: AUTHENTICATE_USER,
    userId,
  }
)

const unauthenticateUser = (userId) => (
  {
    type: UNAUTHENTICATE_USER,
    userId,
  }
)

const removeFetchingUser = () => (
  {
    type: REMOVE_FETCHING_USER,
  }
)

const fetchUserCredentialsSuccess = (userInfo) => (
  {
    type: FETCH_USER_CREDENTIALS_SUCCESS,
    userInfo,
  }
)

const fetchUserCredentialsFailure = (error) => (
  // TODO
  {
    type: FETCH_USER_CREDENTIALS_FAILURE,
    error,
  }
)

// local storage methods
/**
 * Resave user info thunk
 */
export const getUserfromStorage = () => {
  return (dispatch) => {
    dispatch(fetchingUser())
    const localStorageData = fetchUserFromLocalStorage()
    if (localStorageData && Object.keys(localStorageData)) {
      const userInfo = formatUserInfo(
        localStorageData.userId,
        localStorageData.name,
        localStorageData.email,
        localStorageData.pictureUrl)
      dispatch(fetchUserCredentialsSuccess(userInfo))
    } else {
      dispatch(fetchUserCredentialsFailure('You are not logged in'))
    }
  }
}

// thunks

export function fetchAndAuthenticateUser () {
  return function (dispatch) {
    // signal fetching action
    dispatch(fetchingUser())
    // call firebase method to verify authentication to fb
    return authenticate().then(({user, credential}) => {
      const userData = user.providerData[0]
      const userInfo = formatUserInfo(userData.uid, userData.displayName, userData.email, userData.photoURL)
      return dispatch(fetchingUserSuccess(userInfo, Date.now()))
    })
      .then(({user}) => {
        saveUserToLocalStorage(user)
        return saveUser(user)
      })// save user to firebase
      .then((user) => {
        dispatch(authenticateUser(user.userId))
      })// dispatch action to authenticate user
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

export const signOut = (userId) => {
  return (
    (dispatch) => {
      logout()
      dispatch(unauthenticateUser(userId))
      // remove from local storage
      removeUserFromLocalStorage()
    }
  )
}

// user reducer
const initialState = {
  isFetching: false,
  error: '',
  // isAuthenticated: false,
  // authenticatedUserId: '',
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    userId: '',
    name: '',
    avatar: '',
  },
}

const user = (state = initialUserState, action) => {
  switch (action.type) {
  case FETCHING_USER_SUCCESS:
    return {
      ...state,
      info: action.user,
    }
  default:
    return state
  }
}

/** main user reducer */
const users = (state = initialState, action) => {
  switch (action.type) {
  case FETCHING_USER:
    return {
      ...state,
      isFetching: true,
    }
  case FETCHING_USER_FAILURE:
  case FETCH_USER_CREDENTIALS_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    }
  case FETCH_USER_CREDENTIALS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      error: '',
      authenticatedUserId: action.userInfo.userId,
      isAuthenticated: true,
      [action.userInfo.userId]: action.userInfo,
    }
  case FETCHING_USER_SUCCESS:
    return !action.user ? {
      ...state,
      isFetching: false,
      error: '',
    }
      : {
        ...state,
        isFetching: false,
        error: '',
        [action.user.userId]: user(state[action.user.userId], action),
      }
  case AUTHENTICATE_USER:
    return {
      ...state,
      authenticatedUserId: action.userId,
      isAuthenticated: true,
    }
  case UNAUTHENTICATE_USER: {
    let unauthedData = delete state[action.userId]
    return {
      unauthedData,
      authenticatedUserId: '',
      isAuthenticated: false,
      isFetching: false,
      error: '',
    }
  }
  case REMOVE_FETCHING_USER:
    return {
      ...state,
      isFetching: false,
    }
  default:
    return state
  }
}

export { users }
