import React from 'react'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Tag from './Tag'

configure({ adapter: new Adapter() })


describe('Tag | Non-editable', () => {
    const value = "OK"
    const component = (
    <Tag 
        css={{backgroundColor:'pink', fontSize:'1em'}}>
        {value}
    </Tag>
    )

    it('renders component correctly', () => {
        const wrapper = mount(component)
        const tag = wrapper.find('.MuiBox-root[data-test="table-tag"]')

        expect(tag.text()).toEqual(value)
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()

        expect(tree).toMatchSnapshot()
        expect(tree.children[0]).toEqual(value)
    });
})
