import React from 'react'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Ellipsis from './Ellipsis'

configure({ adapter: new Adapter() })


describe('Ellipsis | Non-editable', () => {
    const value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis vestibulum augue, ut ullamcorper velit. Etiam sodales odio ut luctus efficitur"
    const component = (
        <Ellipsis
            text={value}
        />
    )


    it('renders component correctly', () => {
        const wrapper = mount(component)
        const ellipsisContainer = wrapper.find('.table-ellipsis-container')
        const ellipsisValue = wrapper.find('input').props().value

        expect(ellipsisContainer.length).toEqual(1)
        expect(ellipsisValue).toEqual(value)
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()
        const ellipsisValue = tree.children[0].children[0].children[0].props.value

        expect(tree).toMatchSnapshot()
        expect(ellipsisValue).toEqual(value)
    });
})
