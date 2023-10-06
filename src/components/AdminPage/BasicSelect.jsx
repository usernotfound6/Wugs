import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
    const [status, setStatus] = React.useState('');
    console.log("inside status state", status)
  
    const handleChange = (event) => {
      setStatus(event.target.value);
    };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={1}>Onboarding Incomplete</MenuItem>
            <MenuItem value={2}>Pending Wugs Approval</MenuItem>
            <MenuItem value={3}>Render In Progress</MenuItem>
            <MenuItem value={4}>Contract Sent Awaiting Completion</MenuItem>
            <MenuItem value={5}>Pending Contract Approval</MenuItem>
            <MenuItem value={6}>Account Active</MenuItem>
            <MenuItem value={7}>Account Inactive</MenuItem>

          </Select>
        </FormControl>
      </Box>
    );
  }