import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyStepper from '../MyStepper/MyStepper'
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import HelpIcon from '@mui/icons-material/Help';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'

function DemographicsPage() {

  const [peopleCount, setPeopleCount] = React.useState('');
  const [demographic, setDemographic] = React.useState('');
  const [ageGroup, setAgeGroup] = React.useState('');
  const [industry, setIndustry] = React.useState('');
  const [neighborhood, setNeighborhood] = React.useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const client = useSelector((store) => store.client)

  console.log("Client", client.client_id)

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setPeopleCount(event.target.value);
  };

  const handleHelpIconHover = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPosition({
      top: rect.top - 200, // Adjust this value to control the vertical position
      left: rect.left + rect.width, // Adjust this value to control the horizontal position
    });
    setOpenConfirmation(true);
  };

  const handleHelpIconLeave = () => {
    setOpenConfirmation(false);
  };

  const postDemographics = () => {
    console.log("Clicked on Demographics Next")
    dispatch({
        type: 'UPDATE_DEMOGRAPHICS', payload: {
          client_id: client.client_id,
          number_of_people: peopleCount,
          age_group: ageGroup,
          demographics: demographic,
          industry: industry   , 
          neighborhood_info: neighborhood
        }
    }
    )
    
}


  return (
    <div>
      <MyStepper step={2} />
      <Typography variant="h4">Who are YOU serving?  <HelpIcon onMouseEnter={handleHelpIconHover} /></Typography>
      <div style={{ padding: '1em' }}>
        <FormControl>
          <InputLabel id="age-select-label"># of people on site</InputLabel>
          <Select
            labelId="age-select-label"
            id="age-select"
            value={peopleCount}
            label="# of people on Site"
            onChange={handleChange}
          >
            <MenuItem value={"Less than 10"}>Less than 10</MenuItem>
            <MenuItem value={"10-25"}>10-25</MenuItem>
            <MenuItem value={"26-100"}>26-100</MenuItem>
            <MenuItem value={"100+"}>100+</MenuItem>
          </Select>
          <TextField id="demographic" label="Demographic" variant="outlined" onChange={(event) => setDemographic(event.target.value)} />
          <TextField id="ageGroup" label="Age Group" variant="outlined" onChange={(event) => setAgeGroup(event.target.value)} />
          <TextField id="industry" label="Industry" variant="outlined" onChange={(event) => setIndustry(event.target.value)} />
          <TextField id="neighborhood" label="About Your Neighborhood" variant="outlined" onChange={(event) => setNeighborhood(event.target.value)} />
        </FormControl>
      </div>
      <Dialog
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            background: 'beige',
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
          },
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong># OF PEOPLE ON SITE:</strong>
            <br />
            Your best estimation at the number of people on site.
            <br/>
            <strong>DEMOGRAPHIC:</strong>
            <br />
            We'd love to hear about what the culture and diversity of your location, this helps us to best serve you and provide recomendations for a diverse selection of snacking options.
            <br/>
            <strong>AGE GROUP:</strong>
            <br />
            Your general age groups to help us provide product reccomendations.
            <br/>
            <strong>INDUSTRY:</strong>
            <br />
            Decribe the primary operations and business of your location.
            <br/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
      <Button variant="contained" onClick={postDemographics}>SUBMIT/NEXT</Button>
    </div>
  );
}

export default DemographicsPage;