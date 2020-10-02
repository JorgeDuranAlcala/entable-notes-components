import React from 'react'
import { GlobalContext } from 'context'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Avatar from './Avatar'
import { ThemeContext, ThemeProvider } from 'theme'

configure({ adapter: new Adapter() })

const themeZoom = GlobalContext.themeZoom;
const setThemeZoom = () => true

describe('Avatar Component | Valid Image', () => {
    const component = (
      <ThemeContext.Provider value={{ themeZoom, setThemeZoom }}>
        <ThemeProvider>
            <Avatar
                src="https://material-ui.com/static/images/avatar/2.jpg"
                name="Genzo Wonzo"
                size="xs"
                shape="square"
            />
        </ThemeProvider>
      </ThemeContext.Provider>
    )

    const wrapper = mount(component)

    it('renders component correctly', () => {
        const avatar = wrapper.props().children.props
        
        expect(avatar.src).toEqual("https://material-ui.com/static/images/avatar/2.jpg")
        expect(avatar.name).toEqual("Genzo Wonzo")
        expect(avatar.size).toEqual("xs")
        expect(avatar.shape).toEqual("square")
        expect(avatar.border).toEqual(undefined)
    });

    it('renders initials', () => {
        const img = wrapper.find('[data-test="table-avatar"]')

        expect(img.length).toEqual(1)
        expect(img.props().children).toEqual('GW')
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()

        expect(tree).toMatchSnapshot()
    });
})

describe('Avatar Component | Invalid Image', () => {
    const component = (
      <ThemeContext.Provider value={{ themeZoom, setThemeZoom }}>
        <ThemeProvider>
            <Avatar
                src="https://www.gravatarz.com/avatar/fooff"
                name="Natasha Special"
                size="xl"
                shape="round"
                border
            />
        </ThemeProvider>
      </ThemeContext.Provider>
    )

    const wrapper = mount(component)

    it('renders component correctly', () => {
        const avatar = wrapper.props().children.props
        
        expect(avatar.src).toEqual("https://www.gravatarz.com/avatar/fooff")
        expect(avatar.name).toEqual("Natasha Special")
        expect(avatar.size).toEqual("xl")
        expect(avatar.shape).toEqual("round")
        expect(avatar.border).toEqual(true)
    });

    it('renders initials', () => {
        const img = wrapper.find('[data-test="table-avatar"]')

        expect(img.length).toEqual(1)
        expect(img.props().children).toEqual('NS')
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()

        expect(tree).toMatchSnapshot()
    });
})

describe('Avatar Component | No Image', () => {
    const component = (
      <ThemeContext.Provider value={{ themeZoom, setThemeZoom }}>
        <ThemeProvider>
            <Avatar />
        </ThemeProvider>
      </ThemeContext.Provider>
    )

    it('renders fallback', () => {
        const wrapper = mount(component)
        const img = wrapper.find('[data-test="table-avatar"]')

        expect(img.length).toEqual(1)
        expect(img.props().children.props.className.includes('Avatar-fallback')).toBe(true)
        expect(wrapper.find('svg').length).toEqual(1)
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()

        expect(tree).toMatchSnapshot()
    });
})