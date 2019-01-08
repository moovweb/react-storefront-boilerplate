import React from 'react'
import { mount } from 'enzyme'
import Home from '../../src/home/Home'
import TestProvider from '../TestProvider'

describe('Home', () => {
  it('should render', () => {
    expect(mount(
      <TestProvider>
        <Home/>
      </TestProvider>
    )).toMatchSnapshot()
  })
})