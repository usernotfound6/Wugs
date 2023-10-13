import React, { useState, useEffect } from "react";
import MyStepper from "../MyStepper/MyStepper";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CssBaseline,
} from "@mui/material";

function ServiceChoicePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const singleClient = useSelector((store) => store.client);
  const client = useSelector((store) => store.client);
  const [formData, setFormData] = useState({});

  console.log("client!!!", singleClient);

  let defaultMicroMarketCheckedState =
    client?.service_names?.includes("Micro Markets");
  let defaultSmartCoolerChecked =
    client?.service_names?.includes("Smart Coolers");
  let defaultSnackBoxesChecked = client?.service_names?.includes("Snack Boxes");

  const [micromarketChecked, setMicromarketChecked] = useState(
    defaultMicroMarketCheckedState || false
  );
  const [smartcoolersChecked, setSmartcoolersChecked] = useState(
    defaultSmartCoolerChecked || false
  );
  const [snackboxesChecked, setSnackboxesChecked] = useState(
    defaultSnackBoxesChecked || false
  );

  const handleMicromarketChange = () => {
    setMicromarketChecked(!micromarketChecked);
  };
  const handleSmartcoolersChange = () => {
    setSmartcoolersChecked(!smartcoolersChecked);
  };
  const handleSnackboxesChange = () => {
    setSnackboxesChecked(!snackboxesChecked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("micromarket checked?", micromarketChecked);
    // console.log("smartcoolers checked?", smartcoolersChecked);
    // console.log("snackboxes checked?", snackboxesChecked);
    let servicesArray = [];
    if (micromarketChecked) {
      servicesArray.push(1);
    }

    history.push("/clientlocationinfo");

    if (smartcoolersChecked) {
      servicesArray.push(2);
    }
    if (snackboxesChecked) {
      servicesArray.push(3);
    }
    let servicesObj = {
      client_id: singleClient.client_id,
      service_id: servicesArray,
    };
    // console.log(servicesArray);
    dispatch({ type: "UPDATE_SERVICES", payload: servicesObj });
  };

  function dummyData() {
    const presetData = {
      micromarketChecked: true,
      smartcoolersChecked: true,
      snackboxesChecked: true,
    };

    setMicromarketChecked(presetData.micromarketChecked);
    setSmartcoolersChecked(presetData.smartcoolersChecked);
    setSnackboxesChecked(presetData.snackboxesChecked);
  }

  return (
    <div className="container">
      <MyStepper step={0} />
      <CssBaseline />
      <div style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          marginTop={3}
          marginBottom={1}
          style={{ color: "beige" }}
          onClick={dummyData}
        >
          Services
        </Typography>
        <Typography variant="h6" marginBottom={4} style={{ color: "beige" }}>
          Products I'm Interested In...
        </Typography>
      </div>{" "}
      {/* This div was not actually wrapped around anything. Change the justify to space-around */}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <form className="checkbox-container">
          <Grid container spacing={5}>
            {/* Micro Markets */}
            <Grid item xs={12} sm={6} md={4}>
              <input
                type="checkbox"
                id="micromarket"
                name="micromarket"
                value="Micromarket"
                checked={micromarketChecked}
                onChange={handleMicromarketChange}
              />
              <label htmlFor="micromarket">Micro Markets</label>
              <br />

              <Card
                sx={{
                  width: 450,
                  height: 450,
                  borderRadius: 5,
                  backgroundColor: "beige",
                  boxShadow: 24,
                }}
              >
                <CardMedia
                  component="img"
                  alt="Micro Market"
                  height="320"
                  image="https://www.bernicks.com/hubfs/social-suggested-images/micro_market.png"
                />
                <CardContent>
                  <Typography variant="h6">Micro Market</Typography>
                  <Typography variant="body2">
                    Description: Your description here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Smart Coolers */}
            <Grid item xs={12} sm={6} md={4}>
              <input
                type="checkbox"
                id="smartcoolers"
                name="smartcoolers"
                value="SmartCoolers"
                checked={smartcoolersChecked}
                onChange={handleSmartcoolersChange}
              />
              <label htmlFor="smartcoolers">Smart Coolers</label>
              <br />

              <Card
                sx={{
                  width: 450,
                  height: 450,
                  borderRadius: 5,
                  backgroundColor: "beige",
                  boxShadow: 24,
                }}
              >
                <CardMedia
                  component="img"
                  alt="Smart Coolers"
                  height="320"
                  image="https://cdn-dppck.nitrocdn.com/mebfXXXDMymVFbKVdxsHUesbzFkXXUGk/assets/images/optimized/rev-434f8f1/connectvending.co.uk/wp-content/uploads/2023/04/PicoCooler-ProductScan-WebRes-sml.jpg"
                />
                <CardContent>
                  <Typography variant="h6">Smart Coolers</Typography>
                  <Typography variant="body2">
                    Description: Your description here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Snack Boxes */}
            <Grid item xs={12} sm={6} md={4}>
              <input
                type="checkbox"
                id="snackboxes"
                name="snackboxes"
                value="SnackBoxes"
                checked={snackboxesChecked}
                onChange={handleSnackboxesChange}
              />
              <label htmlFor="snackboxes">Snack Boxes</label>
              <br />

              <Card
                sx={{
                  width: 450,
                  height: 450,
                  borderRadius: 5,
                  backgroundColor: "beige",
                  boxShadow: 24,
                }}
              >
                <CardMedia
                  component="img"
                  alt="Snack Boxes"
                  height="320"
                  image="https://i.etsystatic.com/33431484/r/il/046fbf/5169950532/il_1588xN.5169950532_8ddb.jpg"
                />
                <CardContent>
                  <Typography variant="h6">Snack Boxes</Typography>
                  <Typography variant="body2">
                    Description: Your description here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* Added a margin and flex-end to the services button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "30px",
        }}
      >
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
    </div>
  );
}

export default ServiceChoicePage;
