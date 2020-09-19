import React from 'react'
import { GlobalContext } from 'context'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AvatarGroup from './AvatarGroup'
import { ThemeContext, ThemeProvider } from 'theme'

configure({ adapter: new Adapter() })

const themeZoom = GlobalContext.themeZoom;
const setThemeZoom = () => true

describe('AvatarGroup Component | No max prop', () => {
    const component = (
      <ThemeContext.Provider value={{ themeZoom, setThemeZoom }}>
        <ThemeProvider>
            <AvatarGroup
                avatars={[
                {src:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50", name:"Natasha Special"},
                {name:"John Special"},
                {name:"Natasha Special"},
                {name:"Sasha Special"} ,
                {name:"troy smith"}      
                ]}
            />
        </ThemeProvider>
      </ThemeContext.Provider>
    )

    const wrapper = mount(component)

    it('renders component correctly', () => {
        const avatarGroupContainer = wrapper.find('[data-test="table-avatargroup"]')

        expect(avatarGroupContainer.length).toEqual(1)
    });

    it('renders correct amounts of Avatars', () => {
        const imgs = wrapper.find('[data-test="table-avatar"]')

        expect(imgs.length).toEqual(5)
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()

        expect(tree).toMatchSnapshot()
    });
})

describe('AvatarGroup Component | With max prop', () => {
    const component = (
      <ThemeContext.Provider value={{ themeZoom, setThemeZoom }}>
        <ThemeProvider>
            <AvatarGroup
                avatars={[
                {src:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50", name:"Natasha Special"},
                {name:"John Special"},
                {name:"Natasha Special"},
                {name:"Sasha Special"} ,
                {name:"troy smith"}      
                ]}
                max="2"
            />
        </ThemeProvider>
      </ThemeContext.Provider>
    )

    const wrapper = mount(component)

    it('renders component correctly', () => {
        const avatarGroupContainer = wrapper.find('[data-test="table-avatargroup"]')

        expect(avatarGroupContainer.length).toEqual(1)
    });

    it('renders correct amounts of Avatars', () => {
        const imgs = wrapper.find('[data-test="table-avatar"]')

        expect(imgs.length).toEqual(3)
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()

        expect(tree).toMatchSnapshot()
    });
})