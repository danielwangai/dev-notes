import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const NotesModal = (props) => {
  const actions = [
    <FlatButton
      label='Submit Note'
      primary={true}
      onClick={props.submitNote} />,
    <FlatButton
      label='Cancel'
      secondary={true}
      onClick={props.handleModal} />,
  ]
  return (
    <div>
      <FlatButton label='Create Note' onClick={props.handleModal} secondary={true} />
      <Dialog
        title='Create Note'
        actions={actions}
        modal={true}
        open={props.modalStatus}
        contentStyle={{width: '80%'}}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true} >
        <div>
          <TextField
            name='note'
            floatingLabelText='type your note'
            multiLine={true}
            fullWidth={true}
            onChange={props.handleTextChange} /><br />
        </div>
      </Dialog>
    </div>
  )
}

NotesModal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  modalStatus: PropTypes.bool.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  submitNote: PropTypes.func.isRequired,
}

export default NotesModal
