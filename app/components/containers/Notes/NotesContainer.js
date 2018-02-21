import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Note from '../../pages/Note/Note'
import * as notesActionCreators from '../../../store/modules/notes/notes'

// eslint-disable-next-line react/prefer-stateless-function
class NotesContainer extends Component {
  // to be replaced with a modal to save info
  render () {
    return (
      <div>
        <Note />
      </div>
    )
  }
}

NotesContainer.propTypes = {
  // saveNote: PropTypes.func.isRequired,
}

const mapStateToProps = ({notes}) => ({

})

export default connect(mapStateToProps, notesActionCreators)(NotesContainer)
