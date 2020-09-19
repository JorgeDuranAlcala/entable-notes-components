import React from 'react'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DateRangePicker from './DateRangePicker'

configure({ adapter: new Adapter() })


describe('DateRangePicker', () => {
    const component = (
        <DateRangePicker
            format='MMM dd'
            dates={{start: "2020-08-08T03:00:00.000Z", end:"2020-08-23T03:00:00.000Z"}}
            updateRow={
                (datesArray) => alert(`Sent to Parent Component:\n start: ${datesArray[0]}\n end: ${datesArray[1]}`)
            }
        />
    )
    const wrapper = mount(component)
    const datepickerComponent = wrapper.find('[data-test="table-daterangepicker"]')

    it('renders component correctly', () => {
        const formattedDate = wrapper.find('input')
        expect(datepickerComponent.length).not.toEqual(0)
        expect(formattedDate.length).toEqual(1)
        expect(formattedDate.props().value).toEqual('Aug 08 - Aug 23')
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()
        const formattedDate = tree.children[0].children[0].children[0].props.value

        expect(tree).toMatchSnapshot()
        expect(formattedDate).toEqual('Aug 08 - Aug 23')
    });
})
