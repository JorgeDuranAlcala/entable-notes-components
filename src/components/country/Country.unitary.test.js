import React from 'react'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { RenderCountry } from './Country'

configure({ adapter: new Adapter() })


describe('Country | Non-editable | Valid Country Code', () => {
    const component = <RenderCountry country="FR" handleClick={() => false}/>
    const wrapper = mount(component)

    it('renders component correctly', () => {
        const divContainer = wrapper.find('[data-test="table-country"]')
        const countryFlag = wrapper.find('[data-test="table-country-flag"]')
        const countryCode = wrapper.find('[data-test="table-country-code"]')

        expect(divContainer.length).toEqual(1)
        expect(countryFlag.length).toEqual(1)
        expect(countryFlag.props().children).toEqual("🇫🇷")
        expect(countryCode.length).toEqual(1)
        expect(countryCode.props().children).toEqual("FR")
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()
        const countryFlag = tree.children[0]
        const countryCode = tree.children[1]

        expect(tree).toMatchSnapshot();
        expect(countryFlag.type).toEqual('span')
        expect(countryFlag.children[0]).toEqual("🇫🇷")
        expect(countryCode.type).toEqual('span')
        expect(countryCode.children[0]).toEqual('FR')
    });
})

describe('Country | Non-editable | Invalid Country Code', () => {
    const component = <RenderCountry country="zz" handleClick={() => false}/>
    const wrapper = mount(component)

    it('renders component with default flag', () => {
        const divContainer = wrapper.find('[data-test="table-country"]')
        const countryFlag = wrapper.find('[data-test="table-country-flag"]')
        const countryCode = wrapper.find('[data-test="table-country-code"]')

        expect(divContainer.length).toEqual(1)
        expect(countryFlag.length).toEqual(1)
        expect(countryFlag.props().children).toEqual("🇺🇸")
        expect(countryCode.length).toEqual(1)
        expect(countryCode.props().children).toEqual("US")
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()
        const countryFlag = tree.children[0]
        const countryCode = tree.children[1]

        expect(tree).toMatchSnapshot();
        expect(countryFlag.type).toEqual('span')
        expect(countryFlag.children[0]).toEqual("🇺🇸")
        expect(countryCode.type).toEqual('span')
        expect(countryCode.children[0]).toEqual('US')
    });
})

describe('Country | Non-editable | Default Country Code', () => {
    const component = <RenderCountry handleClick={() => false}/>
    const wrapper = mount(component)

    it('renders component correctly', () => {
        const divContainer = wrapper.find('[data-test="table-country"]')
        const countryFlag = wrapper.find('[data-test="table-country-flag"]')
        const countryCode = wrapper.find('[data-test="table-country-code"]')

        expect(divContainer.length).toEqual(1)
        expect(countryFlag.length).toEqual(1)
        expect(countryFlag.props().children).toEqual("🇺🇸")
        expect(countryCode.length).toEqual(1)
        expect(countryCode.props().children).toEqual("US")
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()
        const countryFlag = tree.children[0]
        const countryCode = tree.children[1]

        expect(tree).toMatchSnapshot();
        expect(countryFlag.type).toEqual('span')
        expect(countryFlag.children[0]).toEqual("🇺🇸")
        expect(countryCode.type).toEqual('span')
        expect(countryCode.children[0]).toEqual('US')
    });
})
