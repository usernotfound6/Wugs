import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, CardContent, Modal, TextField, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { PopupWidget } from 'react-calendly';

function UserPage() {

  const rootElement = document.getElementById("popup-root");

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

  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [phone, setPhone] = useState(client.phone || "");
  const [username, setUsername] = useState(user.username || "");
  const [confirmUsername, setConfirmUsername] = useState(user.username || "");

  // New state variables for photo slider
  const [photoIndex, setPhotoIndex] = useState(0);

  // Array of photo URLs
  const photos = ["https://thumb.tildacdn.com/tild3334-3861-4632-a237-663363353830/-/format/webp/Follow_Wugs_On.jpg",
    "https://thumb.tildacdn.com/tild6230-3666-4663-b236-323863323562/-/format/webp/IMG_4905.jpg",
    "https://thumb.tildacdn.com/tild3636-6236-4366-a165-313136626436/-/format/webp/IMG_5099.jpg",
    "https://thumb.tildacdn.com/tild6135-6332-4735-b064-643336306437/-/format/webp/IMG_5076.jpg",];

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
      alert("please complete all inputs")
    } else if (username !== confirmUsername) {
      alert("usernames do not match")
    } else {
      let contactInfoObj = {
        client_id: client.client_id,
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        username: username
      }
      dispatch({ type: 'UPDATE_CONTACT_INFO', payload: contactInfoObj })
    }
  }

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

  return (
    <div className="container">
      <h2>Welcome, {user.first_name || user.username}!</h2>
      <h2>Onboarding Status: {client.status_name}</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <LogOutButton className="btn" />
      <div className="container2" >
        <Card
          variant="outlined"
          sx={{
            backgroundColor: "#eaeaea",
            boxShadow: 5,
            color: "black",
            marginTop: 2,
            width: 350,
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

          </CardContent>
        </Card>

        {/* ---- Photo slider ---- */}
        <div className="photo-slider">
          <Card
            variant="outlined"
            sx={{
              backgroundColor: 'transparent',
              margin: 'auto',
            }}
          >
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <img
                  src={photos[photoIndex]}
                  alt={`Photo ${photoIndex + 1}`}
                  style={{ maxWidth: '600px', maxHeight: '600px', minWidth: '600px', minHeight: '600px', borderRadius: 18 }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="button-container">
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
        <PopupWidget
          url="https://calendly.com/dontyellwillcry"
          rootElement={rootElement}
          text="Click here to schedule a meeting with Wugs!"
          textColor="#ffffff"
          color="#00a2ff"
          style={{
            position: "flex",
            top: "50px",
            left: "20px",
          }}
        />
      </div>
      
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
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
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
                    // InputLabelProps={{ style: { color: "red" } }}
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
                    // InputLabelProps={{ style: { color: "red" } }}
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
                    // InputLabelProps={{ style: { color: "red" } }}
                    type="phone"
                    placeholder="Phone Number"
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
                    // InputLabelProps={{ style: { color: "red" } }}
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
                    // InputLabelProps={{ style: { color: "red" } }}
                    type="email"
                    placeholder="Email Address"
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

                    ***Please note: your username will be changed to this new email if updated.

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

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
