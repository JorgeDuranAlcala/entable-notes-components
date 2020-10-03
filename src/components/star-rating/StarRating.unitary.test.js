import React from 'react'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import StarRating from './StarRating'

configure({ adapter: new Adapter() })

describe('StarRating | Non-editable', () => {
  const values = ['one', 'two', 'three']
  const component = <StarRating value={3} />

  it('renders component correctly', () => {
    const wrapper = mount(component)
    const StarRating = wrapper.find('.MuiRating-root[data-test="table-starrating"]')

    const firstStar = StarRating.props().children[0][0].props.children[1].props.checked
    const secondStar = StarRating.props().children[0][1].props.children[1].props.checked
    const thirdStar = StarRating.props().children[0][2].props.children[1].props.checked
    const fourthStar = StarRating.props().children[0][3].props.children[1].props.checked
    const fifthStar = StarRating.props().children[0][4].props.children[1].props.checked

    expect(StarRating.length).toEqual(1)
    expect(firstStar).toEqual(false)
    expect(secondStar).toEqual(false)
    expect(thirdStar).toEqual(true)
    expect(fourthStar).toEqual(false)
    expect(fifthStar).toEqual(false)
  })

  it('matches snapshot', () => {
    const tree = renderer.create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
