// import * as React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import TextField from "@mui/material/TextField";

// export default function BasicSelect() {
//   const dispatch = useDispatch();

//   const [status, setStatus] = React.useState("");
//   const [input, setInput] = React.useState("");

//   console.log("inside status state", status);

//   const dropdown = (event) => {
//     setStatus(event.target.value);
//   };
//   console.log("MultilineTextField Input", input);

//   const inputField = (event) => {
//     setInput(event.target.value);
//   };

//   function editClient() {
//     dispatch({
//       // type: "SAVE_FAVORITE",
//       // payload: { id: recipe.recipe_id }, // Remember to put your payload in an object or your Saga/router will get mad
//     });
//   }

//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Status</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={status}
//           label="Status"
//           onChange={dropdown}
//         >
//           <MenuItem value={1}>Onboarding Incomplete</MenuItem>
//           <MenuItem value={2}>Pending Wugs Approval</MenuItem>
//           <MenuItem value={3}>Render In Progress</MenuItem>
//           <MenuItem value={4}>Contract Sent Awaiting Completion</MenuItem>
//           <MenuItem value={5}>Pending Contract Approval</MenuItem>
//           <MenuItem value={6}>Account Active</MenuItem>
//           <MenuItem value={7}>Account Inactive</MenuItem>
//         </Select>
//         <div style={{ marginTop: "20px" }}>
//           <TextField
//             id="filled-multiline-static"
//             label="Client Notes"
//             multiline
//             rows={4}
//             //   defaultValue="Default Value"
//             variant="filled"
//             onChange={inputField}
//           />
//         </div>
//       </FormControl>
//     </Box>
//   );
// }
