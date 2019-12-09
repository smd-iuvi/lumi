import * as React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('Default Test App', () => {
  it('Render App', () => {
    const app = shallow(<App />).contains(<h1>App</h1>)
    expect(app).toBeTruthy()
  })
})
