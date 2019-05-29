import React from 'react'

import './Header.css';

const Header = (props) => {
  return (
    <h1 className="Heading Large-Text-Bold">{props.children}</h1>
  )
}

export default Header
