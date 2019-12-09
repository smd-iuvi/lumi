import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Header = styled.div`
  color: ${props => (props.theme.primary ? props.theme.primary : 'black')};
`

const App: React.FC = () => {
  return (
    <div className="App">
      <Header>App</Header>
    </div>
  )
}

export default App
