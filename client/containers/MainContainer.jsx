import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Link} from 'react-router-dom';
import { useState } from 'react';

const MainContainer = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Link to="/">
              <Tab label="Home Page" />
            </Link>
            <Link to={'/trends'}>
              <Tab label="Trends" />
            </Link>
          </Tabs>
        </Box>
        </>
    );
}

export default MainContainer;