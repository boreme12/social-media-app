import React from 'react'
import { shallow } from 'enzyme'
import CommentItem from '../components/commentItem'

it('expect to render Comment Component', () => {
  expect(shallow(<CommentItem />)).toMatchSnapshot()
})