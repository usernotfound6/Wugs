import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  Grid,
  Input,
  Card,
  CardContent,
} from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AdditionalInfoPage() {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null); // Needed for the googel drive post

  const client = useSelector((store) => store.client)

  const [dimensions, setDimensions] = useState(client.dimensions || "");
  const [wugsVisit, setWugsVisit] = useState(client.wugs_visit || false);
  const [formData, setFormData] = useState({
    dimensions: "",
  });

  const [dioOpen, dioSetOpen] = React.useState(false);

  console.log("selectedFiles", selectedFiles)

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const fileNames = [];
  
    for (let i = 0; i < files.length; i++) {
      fileNames.push(files[i].name);
    }
  
    setSelectedFiles([...selectedFiles, ...fileNames]); 
  };

  console.log("client", client)

  const handleClickOpen = () => {
    dioSetOpen(true);
  };

  const handleCloseDio = () => {
    dioSetOpen(false);
  };

  // Function to handle file upload to Google Drive
  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;

    if (files.length > 0) {
      const formData = new FormData();

      // Iterate over the selected files and append them to the form data
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const clientId = client.client_id;

      try {
        // Send a POST request to the '/api/onboarding/upload' endpoint with the form data
        const response = await axios.post(
          `/api/onboarding/upload/pictures/${clientId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data for file uploads
            },
          }
        );

        const data = response.data;
        console.log("Uploaded files: ", data.files);
        if (data) {
          handleClickOpen();
        } else {
          handleCloseDio();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    dispatch({
      type: 'UPDATE_ADDINFO', payload: {
        client_id: client.client_id,
        dimensions: dimensions,
        wugs_visit: wugsVisit,
        pictures: selectedFiles
      }
    })
    history.push('/review')
  }

  function dummyData() {
    const presetData = {
      dimensions: "10 x 15 x 20",
    };
    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      ...presetData,
    }));
    // Update separate state variables (optional)
    setDimensions(presetData.dimensions); 
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
    <div className="container">
      <MyStepper step={4} />

      <div className="wholebody">
        <CssBaseline />
        <div style={{ textAlign: "center" }}>
          <Typography variant='h4' marginTop={3} style={{ color: "beige" }} onClick={dummyData}>Additional Information</Typography>
        </div>{" "}
        <Box margin={'auto'}
          component="form"
          sx={{
            backgroundColor: '#484747',
            borderRadius: 3,
            width: 360,
            padding: 2,
            boxShadow: 24,
            marginTop: 3,
            marginBottom: 9,
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
          <Typography>Upload Photos:</Typography>
          <Typography variant="subtitle2">Provide a photo of your space</Typography>
          <Input
            type="file"
            multiple
            inputRef={fileInputRef}
            style={{ display: 'none' }}
            id="file-input"
            onChange={handleFileSelect}
          />
          <label htmlFor="file-input">
            <Button
              variant="contained"
              component="span"
              startIcon={<AddAPhotoIcon />}
            >
              Select Files
            </Button>
            </label>
          {selectedFiles.length > 0 && (
            <div>
        <Button
          variant="contained"
          onClick={handleFileUpload}
          style={{
            justifyContent: "left",
            marginLeft: "7px", // Add left margin
          }}
          autoFocus
        ><CloudUploadIcon />Upload Files
        </Button>
        <Typography>Selected files:</Typography>
              <ul>
                {selectedFiles.map((fileName, index) => (
                  <li key={index}>{fileName}</li>
                ))}
              </ul>
            </div>
          )}
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "300px",
        }}
      >
      <Button
        onClick={handleSubmit}
        sx={{
          marginTop: 1.5,
          marginLeft: 2,
          height: 50,
          width: 180,
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
    <Dialog
        open={dioOpen}
        onClose={handleCloseDio}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your're files were uploaded succsessfuly"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thank you for your submission. Please feel free to upload more as
            needed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDio} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}

export default AdditionalInfoPage;