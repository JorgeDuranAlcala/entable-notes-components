import React from 'react'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProgressBar from './ProgressBar'

configure({ adapter: new Adapter() })


describe('ProgressBar | Non-editable', () => {
    const value = 63
    const component = (<ProgressBar value={value} />)


    it('renders component correctly', () => {
        const wrapper = mount(component)
        const ProgressBar = wrapper.find('[data-test="table-progressbar"]')

        expect(ProgressBar.length).toEqual(1)
        expect(ProgressBar.props().title).toEqual('63%')
        expect(ProgressBar.props().children.props.value).toEqual(63)
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()

        expect(tree).toMatchSnapshot()
        expect(tree.children[0].props.role).toEqual('progressbar')
        expect(tree.children[0].props['aria-valuenow']).toEqual(63)
    });
})
