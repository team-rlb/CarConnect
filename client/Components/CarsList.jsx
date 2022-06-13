import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import CarsCard from './CarsCard';

export default function CarsList(props) {
  console.log('carsArr', props)

  const carsItems = []; 
  
  props.carsArr.forEach(
    car => {
      carsItems.push(<ListItem>
        <CarsCard carObj={car}/>
      </ListItem>)
    }
  )
  
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '100vh',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
    <ListSubheader>Cars.com</ListSubheader>
    {[carsItems]}
    </List>
  );
}

{/* {[0, 1, 2, 3, 4].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))} */}
