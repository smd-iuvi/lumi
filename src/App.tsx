import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import './Theme/fonts.css'

import FontStyle from './Theme/FontStyles'

const Header = styled.div`
  color: ${props => (props.theme.primary ? props.theme.primary : 'black')};
  font-family: Regular;
`

const App: React.FC = () => {
  return (
    <div className="App">
      <FontStyle />
      <Header>App</Header>
    </div>
  )
}

export default App
