import { configure, addDecorator } from '@storybook/react'
// automatically import all files ending in *.stories.tsx

import ThemeDecorator from '../src/Theme/ThemeDecorator'

addDecorator(ThemeDecorator)
configure(require.context('../src', true, /\.stories\.tsx?$/), module)
