PeopleDropdownSelect Standard Example:
```jsx
<PeopleDropdownSelect 
    people={[
      {
        "src":"https://material-ui.com/static/images/avatar/1.jpg",
        "name":"Remy Sharp"
      },
      {
        "src":"https://material-ui.com/static/images/avatar/2.jpg",
        "name":"Jerko Raminoff"
      },
      {
        "src":"https://material-ui.com/static/images/avatar/3.jpg",
        "name":"Cindy Baker"
      },
      {
        "src":"",
        "name":"Dean Fremington"
      },
      {
        "src":"https://material-ui.com/static/images/avatar/5.jpg",
        "name":"Winko Wiskardin"
      },
      {
        "src":"https://material-ui.com/static/images/avatar/4.jpg",
        "name":"Paula Howard"
      },
      {
        "src":"",
        "name":"Paula Escariante"
      },
      {
        "src":"https://material-ui.com/static/images/avatar/6.jpg",
        "name":"Domino Ramp"
      },
      {
        "src":"https://material-ui.com/static/images/avatar/7.jpg",
        "name":"Sarah Ilighis"
      }
    ]}

    avatarGroupProps={{
        avatars:[
          {
            "src":"https://material-ui.com/static/images/avatar/2.jpg",
            "name":"Jerko Raminoff"
          },
          {
            "src":"",
            "name":"Dean Fremington"
          },
          {
            "src":"https://material-ui.com/static/images/avatar/4.jpg",
            "name":"Paula Howard"
          },
        ],
        shape: 'circle',
        spacing: 'together',
        max: 3,
        classes: {},
        size: 'sm'
    }} 
/>
```