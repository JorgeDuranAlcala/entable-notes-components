import React from 'react'
import { GlobalContext } from 'context'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PeopleDropdownSelect from './PeopleDropdownSelect'
import { ThemeContext, ThemeProvider } from 'theme'

configure({ adapter: new Adapter() })

const themeZoom = GlobalContext.themeZoom
const setThemeZoom = () => true

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})

const preselectedPeople = [
  {
    src: 'https://material-ui.com/static/images/avatar/2.jpg',
    name: 'Jerko Raminoff',
  },
  {
    src: '',
    name: 'Dean Fremington',
  },
  {
    src: 'https://material-ui.com/static/images/avatar/4.jpg',
    name: 'Paula Howard',
  },
  {
    src: 'https://material-ui.com/static/images/avatar/7.jpg',
    name: 'Sarah Ilighis',
  },
]

const selectablePeople = [
  {
    src: 'https://material-ui.com/static/images/avatar/1.jpg',
    name: 'Remy Sharp',
  },
  {
    src: 'https://material-ui.com/static/images/avatar/2.jpg',
    name: 'Jerko Raminoff',
  },
  {
    src: 'https://material-ui.com/static/images/avatar/3.jpg',
    name: 'Cindy Baker',
  },
  {
    src: '',
    name: 'Dean Fremington',
  },
  {
    src: 'https://material-ui.com/static/images/avatar/5.jpg',
    name: 'Winko Wiskardin',
  },
  {
    src: 'https://material-ui.com/static/images/avatar/4.jpg',
    name: 'Paula Howard',
  },
  {
    src: '',
    name: 'Paula Escariante',
  },
  {
    src: 'https://material-ui.com/static/images/avatar/6.jpg',
    name: 'Domino Ramp',
  },
  {
    src: 'https://material-ui.com/static/images/avatar/7.jpg',
    name: 'Sarah Ilighis',
  },
]

describe('PeopleDropdownSelect Component | No max prop', () => {
  const component = (
    <ThemeContext.Provider value={{ themeZoom, setThemeZoom }}>
      <ThemeProvider>
        <PeopleDropdownSelect
          people={selectablePeople}
          avatarGroupProps={{
            avatars: preselectedPeople,
          }}
          setShowEditor={() => false}
        />
      </ThemeProvider>
    </ThemeContext.Provider>
  )

  const wrapper = mount(component)

  it('renders component correctly', () => {
    const peopleDropdownSelectContainer = wrapper.find('[data-test="table-peopledropdownselect"]')
    const avatarGroupContainer = wrapper.find('[data-test="table-avatargroup"]')

    expect(peopleDropdownSelectContainer.length).toEqual(1)
    expect(avatarGroupContainer.length).toEqual(1)
  })

  it('renders correct amounts of Avatars', () => {
    const imgs = wrapper.find('[data-test="table-avatar"]')

    expect(imgs.length).toEqual(selectablePeople.length + preselectedPeople.length)
  })

  it('matches snapshot', () => {
    const tree = renderer.create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
