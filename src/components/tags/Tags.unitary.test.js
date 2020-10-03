import React from 'react'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Tags from './Tags'

configure({ adapter: new Adapter() })

describe('Tags | Non-editable', () => {
  const values = ['one', 'two', 'three']
  const component = <Tags tags={values} />

  it('renders component correctly', () => {
    const wrapper = mount(component)
    const tags = wrapper.find('.MuiBox-root[data-test="table-tags"]')

    expect(tags.length).toEqual(1)
    // values.forEach((value, index) => {
    //     expect(tags.props().children[index].props.children).toEqual(value)
    // })
  })

  it('matches snapshot', () => {
    const tree = renderer.create(component).toJSON()

    expect(tree).toMatchSnapshot()
    values.forEach((value, index) => {
      expect(tree.children[index].children[0]).toEqual(value)
    })
  })
})
