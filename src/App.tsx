import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import './Theme/fonts.css'

import FontStyle from './Theme/FontStyles'
import Button, { ButtonType } from './components/Button/Button'

const Header = styled.div`
  color: ${props => (props.theme.primary ? props.theme.primary : 'black')};
  font-family: Regular;
`

const App: React.FC = () => {
  return (
    <div className="App">
      <FontStyle />
      <Button type={ButtonType.primary} text="Hello"></Button>
    </div>
  )
}

export default App
