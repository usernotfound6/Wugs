import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { styled } from '@mui/material/styles';
import MyStepper from '../MyStepper/MyStepper'
import {
  Box,
  TextField,
  Button,
} from "@mui/material";
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function AdditionalInfoPage() {

  const [dimensions, setDimensions] = useState("");
  const [wugsVisit, setWugsVisit] = useState(false);

  const client = useSelector((store) => store.client)

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch({
      type: 'UPDATE_ADDINFO', payload: {
        client_id: client.client_id,
        dimensions: dimensions, 
        wugs_visit: wugsVisit,
        pictures: ["PICTURES HERE"]
      }
    })
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
      <MyStepper step={4}/>

      <div className="wholebody">
      <Typography variant="h3">Additional Information</Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="dimensions"
          label="Dimensions"
          variant="outlined"
          inputProps={{ style: { color: "beige" } }}
          InputLabelProps={{ style: { color: "beige" } }}
          type="text"
          placeholder="Dimensions"
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
        <Typography variant="h5">Request a Visit from Wugs?</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
        <Typography>No</Typography>
        <AntSwitch defaultunChecked 
        checked={wugsVisit} // Add the checked prop to bind it to state
        onChange={() => setWugsVisit(!wugsVisit)} inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>Yes</Typography>
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