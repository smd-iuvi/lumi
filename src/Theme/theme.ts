import { ThemedStyledProps } from 'styled-components'

type Theme = {
  name: string
  primary: string
  secondary: string
  inactive: string
  searchBar: string
  placeholdersButtonsDark: string
  textDark: string
  textLight: string
  placeholdersLight: string
  negativeFeedback: string
  negativeFeedbackWithTransparency: string
  sidebarFooter: string
  secondaryLight: string
  cards: string
}

const theme: Theme = {
  name: 'Default',
  primary: '#756eff',
  secondary: '#575a80',
  inactive: '#3b3a43',
  searchBar: '#1c1d27',
  placeholdersButtonsDark: '#c6c5d4',
  textDark: '#ffffff',
  textLight: '#15161c',
  placeholdersLight: '#a7a6b3',
  negativeFeedback: '#ff6e6e',
  negativeFeedbackWithTransparency: 'rgba(255, 110, 110, 0.2)',
  sidebarFooter: '#0f0f13',
  secondaryLight: '#eeedff',
  cards: '#2d304b'
}

export type ThemeProps<P> = ThemedStyledProps<P, Theme>
export default theme
