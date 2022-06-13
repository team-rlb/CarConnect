import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import CarsCards from './CarsCard';

export default function CarsList() {




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
    <ListItem>
      <CarsCards />
    </ListItem>
    <ListItem>
      <CarsCards />
    </ListItem>
    <ListItem>
      <CarsCards />
    </ListItem>
    <ListItem>
      <CarsCards />
    </ListItem>
    <ListItem>
      <CarsCards />
    </ListItem>
    <ListItem>
      <CarsCards />
    </ListItem>
    <ListItem>
      <CarsCards />
    </ListItem>
    <ListItem>
      <CarsCards />
    </ListItem>
    <ListItem>
      <CarsCards />
    </ListItem>
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
