Country with defaults
```jsx
    <Country setShowEditor={(content) => console.log(`setShowEditor: ${content}`)} updateCell={(newCellValue) => alert(`Sent to Parent: ${newCellValue}`)} />
```
Country with invalid country defaults to default country
```jsx
    <Country country="zz" setShowEditor={(content) => console.log(`setShowEditor: ${content}`)} updateCell={(newCellValue) => alert(`Sent to Parent: ${newCellValue}`)}/>
```

Country with country with size
```jsx
    <Country country="IN" size="lg" setShowEditor={(content) => console.log(`setShowEditor: ${content}`)} updateCell={(newCellValue) => alert(`Sent to Parent: ${newCellValue}`)}/>
```

Editable Country
```jsx
    <Country country="IN" setShowEditor={(content) => console.log(`setShowEditor: ${content}`)} updateCell={(newCellValue) => alert(`Sent to Parent: ${newCellValue}`)}/>
```