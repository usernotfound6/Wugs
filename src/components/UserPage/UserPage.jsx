import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Box, Button, Card, CardContent, Modal, TextField, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const client = useSelector((store) => store.client);

  const history = useHistory();

  const handleButton = () => {
    history.push("/clientstatus")
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [phone, setPhone] = useState(client.phone || "");
  const [username, setUsername] = useState(user.username || "");

  const handleSave = () => {
    console.log("firstName is:", firstName)
    console.log("lastName is:", lastName)
    console.log("phone is:", phone)
    // console.log("username is:", username)
  }

  return (
    <div className="container">
      <h2>Welcome, {user.first_name || user.username}!</h2>
      <h2>Onboarding Status: {client.status_name}</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <LogOutButton className="btn" />
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "#eaeaea",
          boxShadow: 5,
          color: "black",
          margin: "50px 0"
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 24 }}
            color="black"
            gutterBottom
          >
            Your Contact Info:
          </Typography>
          <Typography variant="h8" component="div">
            <ul>
              <li>Username (email): {user.username}</li>
              <li>Primary Contact: {user.first_name} {user.last_name}</li>
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

          {/* ----------- MODAL START ----------- */}

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}>
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
                  // inputProps={{ style: { color: "beige" } }}
                  // InputLabelProps={{ style: { color: "beige" } }}
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
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

                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  // inputProps={{ style: { color: "beige" } }}
                  // InputLabelProps={{ style: { color: "beige" } }}
                  type="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
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
                <TextField
                  id="phone"
                  label="Phone Number"
                  variant="outlined"
                  // inputProps={{ style: { color: "beige" } }}
                  // InputLabelProps={{ style: { color: "beige" } }}
                  type="phone"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
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
                <TextField
                  id="username"
                  label="Username / Email"
                  variant="outlined"
                  // inputProps={{ style: { color: "beige" } }}
                  // InputLabelProps={{ style: { color: "beige" } }}
                  type="email"
                  placeholder="Email Address"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
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
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Please note: your username will be changed to this new email if updated.
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


        </CardContent>
      </Card>

      <Button
        onClick={handleButton}
        sx={{
          marginTop: 1.5,
          marginLeft: 2,
          height: 50,
          width: 350,
          borderRadius: 1,
        }}
        color="success"
        variant="contained"
        autoFocus
      >
        Update Services or Preferences
      </Button>

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
