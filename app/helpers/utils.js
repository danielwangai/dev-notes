export function formatUserInfo (userId, name, email, pictureUrl) {
  return {
    userId,
    name,
    email,
    pictureUrl,
  }
}

export const checkIfAuthed = (store) => (
  store.getState().users.isAuthenticated
)
