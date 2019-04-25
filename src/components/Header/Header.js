import React from 'react'

import './Header.css';

const Header = (props) => {
  return (
    <h1 className="Heading">{props.children}</h1>
  )
}

export default Header
