import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleChange = (event) => {
    setPeopleCount(event.target.value);
  };

  return (
    <div>
      <MyStepper step={2} />
      <Typography variant="h4">Who are YOU serving? <HelpIcon onClick={() => { setOpenConfirmation(true) }} /></Typography>
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
        </FormControl>
      </div>
      <Dialog
        open={openConfirmation}
        onClose={() => { setOpenConfirmation(false) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            background: "beige",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          About Demographics
        </DialogTitle>
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
          <Button
            onClick={() => { setOpenConfirmation(false) }}
            color="success"
            variant="contained"
            autoFocus
          >
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DemographicsPage;