import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Notes from '../../pages/Notes/Notes'

class NotesContainer extends Component {
  render () {
    return (
      <div>
        <Notes
          userInfo={this.props.info}
        />
      </div>
    )
  }
}

// validate props
NotesContainer.propTypes = {
  info: PropTypes.object.isRequired,
}

function mapStateToProps ({users}) {
  const {info} = users
  console.log("prop\n\n", users[users.authenticatedUserId].info)  
  return {
    info: users[users.authenticatedUserId].info,
  }
}

export default connect(mapStateToProps)(NotesContainer)
