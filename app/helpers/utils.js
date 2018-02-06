export const formatUserInfo = ({ userId, name, email, pictureUrl }) => ({
  userId,
  name,
  email,
  pictureUrl,
})

export const checkIfAuthed = (store) => (
  store.getState().users.isAuthenticated
)

/**
 * Set local storage from store after successful authentication
*/
export const saveUserToLocalStorage = (userInfo) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

/**
 * fetch user info from local storage
*/
export const fetchUserFromLocalStorage = () => (
  JSON.parse(localStorage.getItem('userInfo'))
)

/**
 * delete user info from local storage
*/
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('userInfo')
}
