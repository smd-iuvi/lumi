import React from 'react'
import styled from 'styled-components'

import { ThemeProps } from '../../Theme/theme'

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
  terciary = 'terciary'
}

interface Props {
  type: ButtonType
  text: string
}

const ButtonDiv = styled.div<Props>`
  padding: 0 40px;
  height: 32px;
  border-radius: 5px;
  border: none;
  font-family: Bold;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.36;
  letter-spacing: normal;
  cursor: pointer;
  vertical-align: middle;
  text-align: center;
  line-height: 32px;
  transition: border 0.5s, background-color 0.5s, color 0.5s;
  outline: none;
  color: ${(props: ThemeProps<Props>) => {
    if (props.type) {
      switch (props.type) {
        case ButtonType.secondary:
          return props.theme.primary
          break
        default:
          return props.theme.textDark
          break
      }
    } else {
      return props.theme.textDark
    }
  }}

  background-color: ${(props: ThemeProps<Props>) => {
    switch (props.type) {
      case ButtonType.primary:
        return props.theme.primary
        break
      case ButtonType.secondary:
        return props.theme.secondaryLight
        break
      case ButtonType.terciary:
        return props.theme.secondary
        break
      default:
        return props.theme.primary
        break
    }
  }}

  &:hover {
    color: ${(props: ThemeProps<Props>) => {
      switch (props.type) {
        case ButtonType.secondary:
          return props.theme.textDark
          break
        default:
          return props.theme.textDark
          break
      }
    }}
    
    background-color: ${(props: ThemeProps<Props>) => {
      switch (props.type) {
        case ButtonType.primary:
          return props.theme.primary
          break
        case ButtonType.secondary:
          return props.theme.primary
          break
        case ButtonType.terciary:
          return props.theme.primary
          break
        default:
          return props.theme.primary
          break
      }
    }}
  }
`

const Button: React.SFC<Props> = props => {
  return <ButtonDiv {...props}>{props.text}</ButtonDiv>
}

export default Button
