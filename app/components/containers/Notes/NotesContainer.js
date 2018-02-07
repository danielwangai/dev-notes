import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Notes from '../../pages/Notes/Notes'
import * as notesActionCreators from '../../../store/modules/notes/notes'

// eslint-disable-next-line react/prefer-stateless-function
class NotesContainer extends Component {
  // to be replaced with a modal to save info

  componentDidMount () {
    this.props.saveNote({
      title: 'note 1',
      description: 'description 1',
      timestamp: Date.now(),
    })
  }
  render () {
    return (
      <div>
        <Notes />
      </div>
    )
  }
}

NotesContainer.propTypes = {
  saveNote: PropTypes.func.isRequired,
}

const mapStateToProps = ({notes}) => ({

})

export default connect(mapStateToProps, notesActionCreators)(NotesContainer)
