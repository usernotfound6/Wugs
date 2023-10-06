import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        
      <div>
        <TextField
          id="filled-multiline-static"
          label="Client Notes"
          multiline
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
      </div>
      
    </Box>
  );
}