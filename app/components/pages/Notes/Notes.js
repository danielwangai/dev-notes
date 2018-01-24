import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Notes = (props) => {
  console.log('notes props\n\n', props)
  return (
    <div>
      <h1>This is the Notes page</h1>
      <p>{props.userInfo.userId}</p>
    </div>
  )
}

Notes.propTypes = {
  userInfo: PropTypes.object.isRequired,
}

export default Notes
