import React, { useState, useEffect, useRef } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
  Container,
  Grid,
  Input,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useHistory } from "react-router-dom";
import { PopupWidget } from "react-calendly";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function UserPage() {
  const rootElement = document.getElementById("popup-root");
  const fileInputRef = useRef(null); // Needed for the googel drive post

  const user = useSelector((store) => store.user);
  const client = useSelector((store) => store.client);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleButton = () => {
    history.push("/clientstatus");
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dioOpen, dioSetOpen] = React.useState(false);

  const handleClickOpen = () => {
    dioSetOpen(true);
  };

  const handleCloseDio = () => {
    dioSetOpen(false);
  };
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [phone, setPhone] = useState(client.phone || "");
  const [username, setUsername] = useState(user.username || "");
  const [confirmUsername, setConfirmUsername] = useState(user.username || "");

  // New state variables for photo slider
  const [photoIndex, setPhotoIndex] = useState(0);

  // Array of photo URLs
  const photos = [
    "https://thumb.tildacdn.com/tild3334-3861-4632-a237-663363353830/-/format/webp/Follow_Wugs_On.jpg",
    "https://thumb.tildacdn.com/tild6230-3666-4663-b236-323863323562/-/format/webp/IMG_4905.jpg",
    "https://thumb.tildacdn.com/tild3636-6236-4366-a165-313136626436/-/format/webp/IMG_5099.jpg",
    "https://thumb.tildacdn.com/tild6135-6332-4735-b064-643336306437/-/format/webp/IMG_5076.jpg",
  ];

  // Function to handle photo navigation
  const goToNextPhoto = () => {
    setPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Use useEffect to automatically advance photos after 5 seconds
  useEffect(() => {
    const timer = setTimeout(goToNextPhoto, 5000); // 5000 milliseconds (5 seconds)
  }, [photoIndex]);

  const handleSave = () => {
    // console.log("firstName is:", firstName)
    // console.log("lastName is:", lastName)
    // console.log("phone is:", phone)
    // console.log("username is:", username)
    if (!firstName || !lastName || !phone || !username || !confirmUsername) {
      alert("please complete all inputs");
    } else if (username !== confirmUsername) {
      alert("usernames do not match");
    } else {
      let contactInfoObj = {
        client_id: client.client_id,
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        username: username,
      };
      dispatch({ type: "UPDATE_CONTACT_INFO", payload: contactInfoObj });
    }
  };

  // captures characters into 3 groups, adding parentheses around first group and - between 2nd/3rd groups
  function getFormattedPhoneNum(input) {
    let output = "(";
    input.replace(
      /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/,
      function (match, g1, g2, g3) {
        if (g1.length) {
          output += g1;
          if (g1.length == 3) {
            output += ")";
            if (g2.length) {
              output += " " + g2;
              if (g2.length == 3) {
                output += " - ";
                if (g3.length) {
                  output += g3;
                }
              }
            }
          }
        }
      }
    );
    return output;
  }

  // Function to format the phone number as you type
  const handleFormatPhoneNumber = (event) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    // Remove non-digit characters
    let formattedValue = getFormattedPhoneNum(inputValue);
    setPhone(formattedValue);
  };
  // Function to handle file upload to Google Drive
  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;
    console.log("Selected files:", files);
    console.log("Here is Google Key", process.env.REACT_APP_GOOGLE_JSON_KEY);

    // Check if there are selected files
    if (files.length > 0) {
      const formData = new FormData();

      // Iterate over the selected files and append them to the form data
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      console.log("Uploading files:", formData);
      console.log("file name:", formData.id);
      // const fileUrl = `https://drive.google.com/uc?id=${formData.id}`;
      const clientId = client.client_id;
      console.log("clientId is:", clientId);

      try {
        // Send a POST request to the '/api/onboarding/upload' endpoint with the form data
        const response = await axios.post(
          `/api/onboarding/upload/${clientId}`,
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

  return (
    <>
      <h2>Welcome, {user.first_name || user.username}!</h2>
      <h2>Onboarding Status: {client.status_name}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "30px",
        }}
      >
        {/* <LogOutButton className="btn" /> */}
        <Button
          variant="contained"
          onClick={() => dispatch({ type: "LOGOUT" })}
        >
          Logout
        </Button>
      </div>
      <Container maxWidth="xl">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#eaeaea",
                boxShadow: 5,
                color: "black",
                margin: "10px",
                width: "450px",
                height: "250px",
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 24 }} color="black" gutterBottom>
                  Your Contact Info:
                </Typography>
                <Typography variant="h8" component="div">
                  <ul>
                    <li>Username (email): {user.username}</li>
                    <li>
                      Primary Contact: {user.first_name} {user.last_name}
                    </li>
                    <li>Phone: {client.phone || "Phone number required"}</li>
                  </ul>
                </Typography>
                <Button
                  onClick={handleOpen}
                  sx={{
                    marginTop: 1.5,
                    marginLeft: 2,
                    height: 50,
                    width: 120,
                    borderRadius: 1,
                  }}
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  Edit
                </Button>
                
                <Button
                  onClick={handleButton}
                  sx={{
                    marginTop: 1.5,
                    marginLeft: 2,
                    height: 50,
                    width: 120,
                    borderRadius: 1,
                  }}
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  Update Selections
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            {/* <Card
              variant="outlined"
              sx={{
                borderRadius: '50%',
                width: '500px',
                height: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent background

              }}
            >
              <CardContent> */}
            <img
              src={photos[photoIndex]}
              alt={`Photo ${photoIndex + 1}`}
              style={{
                // maxWidth: "80%",
                // maxHeight: "80%",
                // objectFit: "cover",
                // borderRadius: "50%",
                width: "600px", // Set a fixed width and height to maintain consistency
                height: "600px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            {/* </CardContent>
            </Card> */}
          </Grid>
          <Grid item xs={4}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#eaeaea",
                boxShadow: 5,
                color: "black",
                margin: "10px",
                width: "450px",
                height: "250px",
              }}
            >
              <CardContent>
                <h3 style={{ color: "#f5f5dc" }}>
                  Upload Multiple Pictures to Google Drive
                </h3>
                <input type="file" multiple ref={fileInputRef}></input>
                <label htmlFor="file-input">
                  <Input
                    id="file-input"
                    type="file"
                    inputRef={fileInputRef}
                    style={{ display: "none" }} // Hide the actual input element
                    multiple
                  />
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Select Files
                  </Button>
                </label>
                <Button
                  variant="contained"
                  onClick={handleFileUpload}
                  style={{
                    marginLeft: "10px", // Add left margin
                  }}
                  autoFocus
                >
                  Upload Files
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* <Button
          onClick={handleButton}
          sx={{
            marginTop: 10,
            marginLeft: 2,
            height: 50,
            width: "100%",
            borderRadius: 1,
          }}
          color="success"
          variant="contained"
          autoFocus
        >
          Update Services or Preferences
        </Button> */}

        <PopupWidget
          url="https://calendly.com/dontyellwillcry"
          rootElement={rootElement}
          text="Click here to schedule a meeting with Wugs!"
          textColor="#ffffff"
          color="#00a2ff"
        />
      </Container>

      {/* ----------- MODAL START ----------- */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 270,
            bgcolor: "#484747",
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit your contact info:
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              // inputProps={{ style: { color: "red" } }}
              InputLabelProps={{ style: { color: "beige" } }}
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "red", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red", // Outline color when focused
                  },
                },
              }}
            />
            <br />
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              // inputProps={{ style: { color: "red" } }}
              InputLabelProps={{ style: { color: "beige" } }}
              type="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "red", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red", // Outline color when focused
                  },
                },
              }}
            />
            <br />
            <TextField
              id="phone"
              label="Phone Number"
              variant="outlined"
              // inputProps={{ style: { color: "red" } }}
              InputLabelProps={{ style: { color: "beige" } }}
              type="phone"
              value={phone}
              onChange={handleFormatPhoneNumber}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "red", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red", // Outline color when focused
                  },
                },
              }}
            />
            <br />
            <TextField
              id="username"
              label="Username / Email"
              variant="outlined"
              // inputProps={{ style: { color: "red" } }}
              InputLabelProps={{ style: { color: "beige" } }}
              type="email"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "red", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red", // Outline color when focused
                  },
                },
              }}
            />
            <TextField
              id="confirmusername"
              label="Confirm Username / Email"
              variant="outlined"
              // inputProps={{ style: { color: "red" } }}
              InputLabelProps={{ style: { color: "beige" } }}
              type="email"
              value={confirmUsername}
              onChange={(event) => setConfirmUsername(event.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "red", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red", // Outline color when focused
                  },
                },
              }}
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              *** Please Note: Your username will be changed to this new email
              if updated.
            </Typography>
          </Box>
          <Button
            onClick={handleSave}
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
            Save
          </Button>
        </Box>
      </Modal>
      {/* ----------- MODAL END ----------- */}

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
    </>
  );
}

export default UserPage;
