Avatar Group Standard Example:
```jsx
  <AvatarGroup
      avatars={[{src:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50", name:"Natasha Special"},
      {name:"John Special"},
      {name:"Natasha Special"},
      {name:"Sasha Special"} ,
      {name:"troy smith"}      
      ]}
      size="lg"
      max="3"
      spacing="separate"
  />
```
Avatar Group Spacing Example:
```jsx
  <AvatarGroup
      avatars={[{src:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50", name:"Natasha Special"},
      {src:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50", name:"Natasha Special"},
      {src:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50", name:"Natasha Special"},{src:"https://www.gravatar2.com/avatar/205e460b479e2e5b48aec07710c08d50", name:"Natasha Special"}      
      ]}
      spacing="together"
  />
```