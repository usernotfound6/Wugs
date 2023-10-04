import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FastfoodIcon from '@mui/icons-material/Fastfood';

// Path: /priming

function PrimingPage() {

  const history = useHistory();


  const styles = {
    cardContainer: {
      maxWidth: '42%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto'
    },
    card: {
      maxWidth: '100%',
    },
  };

  return (
    <Box sx={styles.cardContainer}>
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h2" color="text.secondary" gutterBottom>
            WELCOME SNACKER!
          </Typography>
          <Typography variant="h5" component="div">WE'RE HERE TO HELP YOUR ONBOARDING EXPERIENCE</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Here are some things to have ready to complete the process with ease:
          </Typography>
          <Typography variant="body2">
            Pictures of your space
            <br />
            Dimensions of you space
            <br/>
            Details about you location
            <br />
            ????
            <br/>
            ????
            <br />
            ???????
            <br/>

          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" variant="contained" onClick={() => {
                history.push('/servicechoice');
              }}><FastfoodIcon/> GET SNACKING!</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default PrimingPage;