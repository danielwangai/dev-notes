import {
  AUTHENTICATE_USER, FETCHING_USER,
  FETCHING_USER_FAILURE, FETCHING_USER_SUCCESS,
  REMOVE_FETCHING_USER, UNAUTHENTICATE_USER } from '../actions'

// action creators

const fetchingUser = () => (
  {
    type: FETCHING_USER,
  }
)

const fetchingUserSuccess = (user, timestamp) => (
  {
    type: FETCHING_USER_SUCCESS,
    user,
    timestamp,
  }
)

const fetchingUserFailure = () => (
  {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user.',
  }
)

const authenticateUser = (userId) => (
  {
    type: AUTHENTICATE_USER,
    userId,
  }
)

const unauthenticateUser = () => (
  {
    type: UNAUTHENTICATE_USER,
  }
)

const removeFetchingUser = () => (
  {
    type: REMOVE_FETCHING_USER,
  }
)

// thunks

// user reducer
const initialState = {
  isFetching: false,
  error: '',
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
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCHING_USER:
    return {
      ...state,
      isFetching: true,
    }
  case FETCHING_USER_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: 'Error Fetching user',
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
  case UNAUTHENTICATE_USER:
    return {
      ...state,
      authenticatedUserId: '',
      isAuthenticated: false,
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

// export default reducer
export default usersReducer
