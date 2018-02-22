import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Note from '../../pages/Note/Note'
import * as notesActionCreators from '../../../store/modules/notes/notes'

import './notes-container.scss'

// eslint-disable-next-line react/prefer-stateless-function
class NotesContainer extends Component {
  componentDidMount () {
    this.props.fetchAllNotes()
  }
  // to be replaced with a modal to save info
  render () {
    // console.log('fetch all notes\n\n', this.props.noteFeed)
    const { noteFeed } = this.props
    // console.log('noteFeed\n\n', noteFeed)
    return (
      <div className='notes-container'>
        {/* <Note /> */}
        {noteFeed.map((note) => (
          <Note
            key={note.noteId}
            title={note.title}
            content={note.content}
            timestamp={note.timestamp}
            authorInfo={note.userInfo} />
        ))}
      </div>
    )
  }
}

NotesContainer.propTypes = {
  // saveNote: PropTypes.func.isRequired,
  fetchAllNotes: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  // noteFeed: PropTypes.object.isRequired,
}

const mapStateToProps = ({notes}) => {
  return {
    noteFeed: notes.noteFeed,
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(notesActionCreators, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer)
