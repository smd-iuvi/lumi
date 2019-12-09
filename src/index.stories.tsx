import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import App from './App'

const stories = storiesOf('App', module).add('default', () => <App />)
