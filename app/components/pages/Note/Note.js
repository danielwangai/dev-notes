import React from 'react'
import PropTypes from 'prop-types'

import './notes.scss'

const Note = ({ title, content, timestamp, authorInfo }) => {
  return (
    <div className='note-card'>
      <div className='note-title'>{title.toUpperCase()}</div>
      <div className='note-body'>
        <p className='note-content'>{content}</p>
      </div>
      <div className='note-footer'>
        <div className='author-info'>
          <img className='author-avatar' src={authorInfo.pictureUrl} alt={authorInfo.name} />
          <span className='author-name'>{authorInfo.name}</span>
        </div>
        <div className='note-likes'>
          {/* TODO - replace with like/heart icon */}
          <img className='note-heart' src={authorInfo.pictureUrl} alt={authorInfo.name} />          
          <span className='note-like-count'>443251</span>          
        </div>
        <span className='note-publish-date'>{timestamp}</span>
      </div>
    </div>
  )
}

const { string, number, object } = PropTypes

Note.PropTypes = {
  title: string.isRequired,
  content: string.isRequired,
  timestamp: number.isRequired,
  authorInfo: object.isRequired,
}

export default Note
