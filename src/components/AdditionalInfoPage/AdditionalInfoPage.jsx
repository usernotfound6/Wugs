import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MyStepper from '../MyStepper/MyStepper'
import {
  Box,
  TextField,
  Button,
  Stack,
  Switch,
  Typography,
  CssBaseline,
} from "@mui/material";

function AdditionalInfoPage() {

  const client = useSelector((store) => store.client)

  const [dimensions, setDimensions] = useState(client.dimensions || "");
  const [wugsVisit, setWugsVisit] = useState(client.wugs_visit || false);

  console.log("client", client)

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    dispatch({
      type: 'UPDATE_ADDINFO', payload: {
        client_id: client.client_id,
        dimensions: dimensions,
        wugs_visit: wugsVisit,
        pictures: ["PICTURES HERE"]
      }
    })
    history.push('/review')
  }


  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  return (
    <div>
      <MyStepper step={4} />

      <div className="wholebody">
      <CssBaseline />
        <div style={{ textAlign: "center" }}>
          <Typography variant= 'h4' marginTop={3}  style={{ color: "beige" }}>Additional Information</Typography>
          </div>{" "}

    
      
      <Box margin={'auto'}
      
        component="form"
        sx={{

          backgroundColor: '#484747',
          borderRadius: 3,
          width: 360,
          padding: 2,
          elevation: 24,
          marginTop: 3,
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        >
          <TextField
            id="dimensions"
            label="Market Location Dimensions"
            variant="outlined"
            inputProps={{ style: { color: "beige" } }}
            InputLabelProps={{ style: { color: "beige" } }}
            type="text"
            style={{ width: 310 }}
            placeholder="16 x 12"
            value={dimensions}
            onChange={(event) => setDimensions(event.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray", // Outline color when not focused
                },
                "&:hover fieldset": {
                  borderColor: "beige", // Outline color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "beige", // Outline color when focused
                },
              },
            }}
          />
          <br />
          <Typography display='flex' justifyContent='center' color='beige' variant="h6">Request a Visit from Wugs?</Typography>
          <Stack display='flex' margin={'auto'} justifyContent='center' direction="row" spacing={1} alignItems="center">
            <Typography color='beige'>No</Typography>
            <AntSwitch 
              checked={wugsVisit} // Add the checked prop to bind it to state
              onChange={() => setWugsVisit(!wugsVisit)} inputProps={{ 'aria-label': 'ant design' }} />
            <Typography color='beige'>Yes</Typography>
          </Stack>


          <br />

          <br />


          <br />

        </Box>

        <Button
          onClick={handleSubmit}
          sx={{
            marginTop: 1.5,
            marginLeft: 2,
            height: 50,
            width: 120,
            borderRadius: 1,
          }}
          color="success"
          variant="contained"
          autoFocus
        >
          Submit
        </Button>

      </div>
    </div>
  );
}

export default AdditionalInfoPage;