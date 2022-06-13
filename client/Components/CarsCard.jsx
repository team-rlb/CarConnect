import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function CarsCard(props) {
  console.log('hi1')
  console.log('hi car price')
  
  return (

    <Card sx={{ maxWidth: 450 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={props.carObj.image ? props.carObj.image :"https://static.wikia.nocookie.net/0b6408dc-ead8-42d9-a639-94068519d635/scale-to-width/755"}
          alt="car photo"
        />
        <CardContent sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(4,1fr)',
          alignItems: 'center',
          justifyItems: 'space-arond',
          columnGap: 4
        }}>
          <Typography 
          sx={{
            gridColumn: '1/2',
            gridRow: '1/4',
          }}
          gutterBottom variant="h4" component="div">
            {/* {console.log('car make', props.carObj.make)} */}
            {`${props.carObj.make.charAt(0).toUpperCase()+props.carObj.make.slice(1)} ${props.carObj.model.charAt(0).toUpperCase()+props.carObj.model.slice(1)}`}
          </Typography>
          <Typography sx={{
            gridColumn: '2/3',
            gridRow: '1/2'
          }}
          variant="h5" color="text.secondary">
            {`$${props.carObj.price}`}
          </Typography>
          <Typography 
          sx={{
            gridColumn: '2/3',
            gridRow: '2/3'
          }}
          variant="body2" color="text.secondary">
            {`${props.carObj.mileage} mileage`}
          </Typography>
          <Typography 
          sx={{
            gridColumn: '2/3',
            gridRow: '3/4'
          }}
          variant="body2" color="text.secondary">
            {`Year: ${props.carObj.year}`}
          </Typography>
          <Typography 
          sx={{
            gridColumn: '2/3',
            gridRow: '4/5'
          }}
          variant="body2" color="text.secondary">
            {`ZIP: ${props.carObj.zip}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <a href={`https://www.${props.carObj.url}`} target="_blank" rel="noreferrer noopener">Check in the website</a>
        </Button>
      </CardActions>
    </Card>
  );
}
