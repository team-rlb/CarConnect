import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://static.wikia.nocookie.net/0b6408dc-ead8-42d9-a639-94068519d635/scale-to-width/755"
          alt="car photo"
        />
        <CardContent sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(4,1fr)',
          alignItems: 'center',
          justifyItems: 'space-around'
        }}>
          <Typography 
          sx={{
            gridColumn: '1/2',
            gridRow: '1/4',
            marginLeft: 3
          }}
          gutterBottom variant="h4" component="div">
            Honda Civic
          </Typography>
          <Typography sx={{
            gridColumn: '2/3',
            gridRow: '1/2'
          }}
          variant="h5" color="text.secondary">
            $14,999
          </Typography>
          <Typography 
          sx={{
            gridColumn: '2/3',
            gridRow: '2/3'
          }}
          variant="body2" color="text.secondary">
            500,000 mileage
          </Typography>
          <Typography 
          sx={{
            gridColumn: '2/3',
            gridRow: '3/4'
          }}
          variant="body2" color="text.secondary">
            Year: 2015
          </Typography>
          <Typography 
          sx={{
            gridColumn: '2/3',
            gridRow: '4/5'
          }}
          variant="body2" color="text.secondary">
            ZIP: 10001
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Check in the website
        </Button>
      </CardActions>
    </Card>
  );
}
