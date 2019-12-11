import * as React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Button, { ButtonType } from './Button'

const stories = storiesOf('Button', module)
  .add('Primary', () => <Button type={ButtonType.primary} text="Clique aqui" />)
  .add('Secondary', () => (
    <Button type={ButtonType.secondary} text="Clique aqui" />
  ))
  .add('Terciary', () => (
    <Button type={ButtonType.terciary} text="Clique aqui" />
  ))
