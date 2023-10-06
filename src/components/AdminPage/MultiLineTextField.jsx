// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function MultilineTextFields() {
//     const [input, setInput] = React.useState('');
//     console.log("MultilineTextField Input", input)

//     const handleChange = (event) => {
//       setInput(event.target.value);
//     };


//   return (
//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
        
//       <div>
//         <TextField
//           id="filled-multiline-static"
//           label="Client Notes"
//           multiline
//           rows={4}
//         //   defaultValue="Default Value"
//           variant="filled"
//           onChange={handleChange}
//         />
//       </div>
      
//     </Box>
//   );
// }