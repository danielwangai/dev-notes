import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NotesModal from '../../pages/Notes/NotesModal'
import { saveNote } from '../../../store/modules/notes/notes'
import { formatNote } from '../../../helpers/utils'

// eslint-disable-next-line react/prefer-stateless-function
class NotesModalContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalOpen: false,
      note: '',
    }
  }

  handleModal = () => (
    this.state.isModalOpen === false ? this.setState({isModalOpen: true}) : this.setState({isModalOpen: false})
  )

  handleTextChange = (event) => {
    let note = event.target.value
    this.setState({
      [event.target.name]: note,
    })
  }

  submitNote = () => {
    if (!this.state.note) {
      console.log('you need to put a note to submit')
      return
    }
    this.props.saveNote(formatNote(this.state.note, this.props.user))
    this.setState({note: ''})
    this.handleModal()
  }

  render () {
    return (
      <div>
        <NotesModal
          modalStatus={this.state.isModalOpen}
          handleTextChange={this.handleTextChange}
          submitNote={this.submitNote}
          handleModal={this.handleModal}/>
      </div>
    )
  }
}

NotesModalContainer.propTypes = {
  saveNote: PropTypes.func.isRequired,
}

const mapStateToProps = ({users}) => ({
  user: users[users.authenticatedUserId],
})

export default connect(mapStateToProps, {saveNote})(NotesModalContainer)
