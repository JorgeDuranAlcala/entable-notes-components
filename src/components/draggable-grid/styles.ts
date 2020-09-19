import { makeStyles } from '@material-ui/core';
// https://codepen.io/mogpt/pen/EGBRjW
// https://github.com/clippings/layout-grid
export default makeStyles(theme => ({
  container: {
  },
  grid: {
      display: 'inline-grid',
      gridAutoColumns: 100,
      gridAutoFlow: 'column',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto'
  },
  day: {
        borderBottom: '1px solid #aeaeae',
        padding: '10px 10px',
        textAlign: 'center',
  },
  dayE: {
    padding: '10px 10px',
    textAlign: 'center',
  },
  textContaier : {
    display: 'table'
  },
  text: {
    display: 'table-cell',
    verticalAlign: 'middle',
    marginLeft: 0
  },
  tag:{
    gridColumn: 1,
    padding: '20px 40px',
    margin: 5,
    borderRadius: 5,
    width: 200,
    textAlign: 'center',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  line: {
    borderRadius: 3,
    margin: 5,
    padding: '10px 20px',
    height: 50,
    display: 'table',
    textOverflow: 'ellipsis',
    overflow: 'hidden', 
    whiteSpace: 'nowrap',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  
}));