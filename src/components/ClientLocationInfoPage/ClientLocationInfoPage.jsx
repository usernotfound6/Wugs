import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// the CssBaseline was no inported?
import CssBaseline from '@mui/material/CssBaseline';
import MyStepper from '../MyStepper/MyStepper';
import { Button } from "@mui/material";

// Path: /clientlocationmoreinfo

function ClientLocationInfoPage() {

  const client = useSelector((store) => store.client)


  const [businessname, setBusinessName] = useState(client.business_name);
  const [address, setAddress] = useState(client.address);
  const [website, setWebsite] = useState(client.website);
  const [phone, setPhone] = useState(client.phone);
  const [hours, setHours] = useState(client.hours_of_operation);
  const [micromarket, setMicroMarket] = useState(client.micromarket_location);

  const [openConfirmation, setOpenConfirmation] = useState(false);

  
  const history = useHistory();
  const dispatch = useDispatch();

  console.log("client!!!!", client
  )

  // captures characters into 3 groups, adding parentheses around first group and - between 2nd/3rd groups
  // these functions are used to format a 10-digit US phone number as it's being typed: (XXX) XXX - XXXX)
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

  const handleConfirmSubmit = () => {
    setOpenConfirmation(false);
    history.push("/demographics");
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };


  const handleSubmit = () => {
    // console.log("inside handleSubmit");
    let clientLocationInfoObject = {
      client_id: client.client_id,
      business_name: businessname,
      address: address,
      website: website,
      phone: phone,
      hours_of_operation: hours,
      micromarket_location: micromarket,
    };
    dispatch({ type: 'UPDATE_CLIENT_LOCATION', payload: clientLocationInfoObject })

    history.push("/demographics");
  };


  return (
    <div className="wholebody">
      <div>
        <MyStepper step={1} />
      </div>
      <CssBaseline />
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "beige" }}>Who Are We Serving?</h1>
          </div>{" "}
      <Box margin={'auto'}
        component="form"
        sx={{
          
          backgroundColor: '#484747',
          borderRadius: 3,
          width: 360,
          padding: 2,
         elevation: 24,
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField 
          id="businessname"
          label="Business Name"
          variant="outlined"
          inputProps={{ style: { color: "beige" } }}
          InputLabelProps={{ style: { color: "beige" } }}
          type="text"
          placeholder="Business Name"
          value={businessname}
          onChange={(event) => setBusinessName(event.target.value)}
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
          id="address"
          label="Address"
          variant="outlined"
          inputProps={{ style: { color: "beige" } }}
          InputLabelProps={{ style: { color: "beige" } }}
          type="address"
          placeholder="123 Snack St N"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
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
          id="website"
          label="Website"
          variant="outlined"
          inputProps={{ style: { color: "beige" } }}
          InputLabelProps={{ style: { color: "beige" } }}
          type="text"
          placeholder="munch.com"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
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
          inputProps={{ style: { color: "beige" } }}
          InputLabelProps={{ style: { color: "beige" } }}
          type="tel"
          placeholder="(123) 456-7890"
          value={phone}
          onChange={handleFormatPhoneNumber}
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
          id="hours"
          label="Hours Of Operation?"
          variant="outlined"
          inputProps={{ style: { color: "beige" } }}
          InputLabelProps={{ style: { color: "beige" } }}
          multiline
          rows={1}
          placeholder="9am-5pm"
          value={hours}
          onChange={(event) => setHours(event.target.value)}
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
          id="micromarket"
          label="Micro-Market Location Inside Building"
          variant="outlined"
          style={{ width: 310 }}
          inputProps={{ style: { color: "beige" } }}
          InputLabelProps={{ style: { color: "beige" } }}
          multiline
          rows={1}
          placeholder="Ex: Lobby, Cafeteria"
          value={micromarket}
          onChange={(event) => setMicroMarket(event.target.value)}
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
      </Box>

      <Button 
        onClick={handleSubmit}
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
        Next
      </Button>
    </div>
  );
}

export default ClientLocationInfoPage;
