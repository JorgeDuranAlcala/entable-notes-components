
Address Editable Version with Place Name
```jsx
    <Address
        placeName="Ontario, Canada"
        setShowEditor={() => true} updateCell={(placeId) => alert(`Place Name sent to Parent: ${placeId}`)} 
    />
```


Address Editable Version with no Place Name
```jsx
    <Address
        updateCell={(placeId) => alert(`Place Name sent to Parent: ${placeId}`)} 
    />
```