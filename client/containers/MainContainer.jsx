import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CarsList from '../Components/CarsList';
import HomePage from './HomePage';
import Trends from './Trends';
import {Link} from 'react-router-dom';

const MainContainer = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Home Page" />
            <Tab label="Cars Info" />
            <Tab label="Trends" />
          </Tabs>
        </Box>
        <CarsInfo />
        </>
    );
}

export default MainContainer;