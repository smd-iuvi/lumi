import * as React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'

import Button, { ButtonType } from './Button'

import Theme from '../../Theme/theme'

describe('Test Button', () => {
  const text = 'Hello World'

  it('Render Button', () => {
    const button = shallow(
      <Button type={ButtonType.primary} text={text} />
    ).contains(text)
    expect(button).toBeTruthy()
  })
})
