DateRangePicker Standard Example:

```jsx
<DateRangePicker
  format="MMM dd"
  dates={{ start: '2020-08-08T03:00:00.000Z', end: '2020-08-23T03:00:00.000Z' }}
  updateCell={datesArray => alert(`Sent to Parent Component:\n start: ${datesArray[0]}\n end: ${datesArray[1]}`)}
/>
```
