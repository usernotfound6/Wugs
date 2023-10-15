import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MyStepper from "../MyStepper/MyStepper";
import HelpIcon from "@mui/icons-material/Help";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Box, Grid, CssBaseline, } from "@mui/material";

function DemographicsPage() {
  const client = useSelector((store) => store.client);

  const dispatch = useDispatch();
  const history = useHistory();

  const [peopleCount, setPeopleCount] = useState(client.number_of_people || "");
  const [demographic, setDemographic] = useState(client.demographics || "");
  const [ageGroup, setAgeGroup] = useState(client.target_age_group || "");
  const [industry, setIndustry] = useState(client.industry || "");
  const [neighborhood, setNeighborhood] = useState(
    client.neighborhood_info || ""
  );
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [formData, setFormData] = useState({
    number_of_people: "",
    age_group: "",
    demographics: "",
    industry: "",
    neighborhood_info: "",
  });

  const handleChange = (event) => {
    setPeopleCount(event.target.value);
  };

  const handleHelpIconHover = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPosition({
      top: rect.top - 200, // Adjust this value to control the vertical position
      left: rect.left + rect.width, // Adjust this value to control the horizontal position
    });
    setOpenConfirmation(true);
  };

  const handleHelpIconLeave = () => {
    setOpenConfirmation(false);
  };

  const postDemographics = () => {
    console.log("Clicked on Demographics Next");
    dispatch({
      type: "UPDATE_DEMOGRAPHICS",
      payload: {
        client_id: client.client_id,
        number_of_people: peopleCount,
        age_group: ageGroup,
        demographics: demographic,
        industry: industry,
        neighborhood_info: neighborhood,
      },
    });
    history.push("/foodpreferences");
  };

  function dummyData() {
    const presetData = {
      number_of_people: "100+",
      age_group: "Young Adults",
      demographics: "Students",
      industry: "Education",
      neighborhood_info: "Large campus, mostly gas stations and laundromats",
    };

    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      ...presetData,
    }));

    // Update separate state variables (optional)
    setPeopleCount(presetData.number_of_people);
    setAgeGroup(presetData.age_group);
    setDemographic(presetData.demographics);
    setIndustry(presetData.industry);
    setNeighborhood(presetData.neighborhood_info);

  }

  return (
    <div className="container">
      <MyStepper step={2} />
      <CssBaseline />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h4" marginTop={3} style={{ color: "beige" }} onClick={dummyData}>
          About Your Community
        </Typography>
        <Typography variant="h6" marginTop={1} style={{ color: "beige" }}>
          Who Are You Serving?
        </Typography>
        <HelpIcon
          style={{ marginTop: 10, color: "beige" }}
          onMouseEnter={handleHelpIconHover}
        />
      </div>{" "}
      <div style={{ padding: "1em" }}>
        <Grid margin={"auto"}>
          <Box
            margin={"auto"}
            component="form"
            sx={{
              backgroundColor: "#484747",
              borderRadius: 3,
              width: 330,
              padding: 2,
              boxShadow: 24,
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl>
              <InputLabel style={{ color: "beige" }} id="age-select-label">
                # of people on site
              </InputLabel>
              <Select
                labelId="age-select-label"
                id="age-select"
                value={peopleCount}
                label="# of people on site"
                inputProps={{ style: { color: "beige" } }}
                InputLabelProps={{ style: { color: "beige" } }}
                style={{ width: 280 }}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "beige",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderColor: "beige",
                    "&:hover fieldset": {
                      borderColor: "beige", // Outline color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "beige", // Outline color when focused
                    },
                  },
                }}
              >
                <MenuItem value={"Less than 10"}>Less than 10</MenuItem>
                <MenuItem value={"10-25"}>10-25</MenuItem>
                <MenuItem value={"26-100"}>26-100</MenuItem>
                <MenuItem value={"100+"}>100+</MenuItem>
              </Select>
              <br />

              <TextField
                id="demographic"
                label="Demographic"
                variant="outlined"
                inputProps={{ style: { color: "beige" } }}
                InputLabelProps={{ style: { color: "beige" } }}
                style={{ width: 280 }}
                placeholder="Demographics"
                value={demographic}
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
                onChange={(event) => setDemographic(event.target.value)}
              />
              <br />
              <TextField
                id="ageGroup"
                label="Age Group"
                variant="outlined"
                inputProps={{ style: { color: "beige" } }}
                InputLabelProps={{ style: { color: "beige" } }}
                style={{ width: 280 }}
                placeholder="Age Group"
                value={ageGroup}
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
                onChange={(event) => setAgeGroup(event.target.value)}
              />
              <br />
              <TextField
                id="industry"
                label="Industry"
                variant="outlined"
                inputProps={{ style: { color: "beige" } }}
                InputLabelProps={{ style: { color: "beige" } }}
                style={{ width: 280 }}
                placeholder="Industry"
                value={industry}
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
                onChange={(event) => setIndustry(event.target.value)}
              />
              <br />
              <TextField
                id="neighborhood"
                label="About Your Neighborhood"
                variant="outlined"
                multiline
                rows={4}
                style={{ width: 280 }}
                inputProps={{ style: { color: "beige" } }}
                InputLabelProps={{ style: { color: "beige" } }}
                
                value={neighborhood}
                onChange={(event) => setNeighborhood(event.target.value)}
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
            </FormControl>
          </Box>
        </Grid>
      </div>
      <Dialog
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            background: "beige",
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
          },
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong># OF PEOPLE ON SITE:</strong>
            <br />
            Your best estimation at the number of people on site.
            <br />
            <strong>DEMOGRAPHICS:</strong>
            <br />
            We'd love to hear about the culture and diversity of your
            location. This helps us to best serve you and provide recommendations
            for a unique selection of snacking options.
            <br />
            <strong>AGE GROUP:</strong>
            <br />
            The general age groups of people who will use the services to help us provide product recommendations.
            <br />
            <strong>INDUSTRY:</strong>
            <br />
            Decribe the primary operations and business of your location.
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "30px",
        }}
      >
        <Button
          onClick={postDemographics}
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
    </div>
  );
}

export default DemographicsPage;
