import React from 'react'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { GlobalContext } from 'context'
import { ThemeContext, ThemeProvider } from 'theme'
import { renderLocation } from '../table/cell-renderers'
import Address from './Address'

configure({ adapter: new Adapter() })

const themeZoom = GlobalContext.themeZoom;
const setThemeZoom = () => true
 
const value = "Ontario, Canada"

describe('Address | Read-mode', () => {
    const classes = { fontSize: 'makeStyles-fontSize-698', ellipsis: 'makeStyles-ellipsis-709'}
    const handleClick = () => false

    it('renders component with place', () => {
        expect(renderLocation({classes, value, handleClick})).toEqual(
            <span className="makeStyles-fontSize-698 makeStyles-ellipsis-709" onClick={handleClick} title="Ontario, Canada">Ontario, Canada</span>
        )
    });

    it('renders component with no place', () => {
        expect(renderLocation({classes, handleClick})).toEqual(
            <span className="makeStyles-fontSize-698 makeStyles-ellipsis-709" onClick={handleClick} title="Select a Place">{' '}</span>
        )
    });
})

describe('Address | Editable | No default place', () => {
    global.document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: {
          nodeName: "BODY",
          ownerDocument: document,
        },
    })

    const component = (
      <ThemeContext.Provider value={{ themeZoom, setThemeZoom }}>
        <ThemeProvider>
            <Address setShowEditor={() => true} updateCell={(placeId) => alert(`Place Name sent to Parent: ${placeId}`)}  />
        </ThemeProvider>
      </ThemeContext.Provider>
    )
    const wrapper = mount(component)
    const input = wrapper.find('input')

    it('renders component correctly', () => {
        const divContainer = wrapper.find('[data-test="table-address"]')

        expect(divContainer.length).toEqual(1)
        expect(input.length).toEqual(1)
        expect(input.props().value).toEqual('Select Location')
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()

        expect(tree).toMatchSnapshot();
    });
})

describe('Address | Editable | Default place', () => {
    global.document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: {
          nodeName: "BODY",
          ownerDocument: document,
        },
    })

    const component = (
      <ThemeContext.Provider value={{ themeZoom, setThemeZoom }}>
        <ThemeProvider>
            <Address placeName={value} setShowEditor={() => true} updateCell={(placeId) => alert(`Place Name sent to Parent: ${placeId}`)}  />
        </ThemeProvider>
      </ThemeContext.Provider>
    )
    const wrapper = mount(component)
    const input = wrapper.find('input')

    it('renders component correctly', () => {
        const divContainer = wrapper.find('[data-test="table-address"]')

        expect(divContainer.length).toEqual(1)
        expect(input.length).toEqual(1)
        expect(input.props().value).toEqual('Ontario, Canada')
    });
})
