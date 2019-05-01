import React from 'react'

import './SessionTitle.css';

const SessionTitle = (props) => {
  return (
    <div className="SessionTitle">
      <h1 className="TextSession">{props.children}</h1>
    </div>
  )
}

export default SessionTitle
