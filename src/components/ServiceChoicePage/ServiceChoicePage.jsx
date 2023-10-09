import React, { useState } from "react";
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
} from "@mui/material";
import "./ServiceChoicePage.css";

function ServiceChoicePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const singleClient = useSelector((store) => store.client);
  //Do we still need this? 👆
  const client = useSelector((store) => store.client)

  let defaultMicroMarketCheckedState = client.service_names.includes("Micro Markets")
  let defaultSmartCoolerChecked = client.service_names.includes("Smart Coolers")
  let defaultSnackBoxesChecked = client.service_names.includes("Snack Boxes")


  const [micromarketChecked, setMicromarketChecked] = useState(defaultMicroMarketCheckedState);
  const [smartcoolersChecked, setSmartcoolersChecked] = useState(defaultSmartCoolerChecked);
  const [snackboxesChecked, setSnackboxesChecked] = useState(defaultSnackBoxesChecked);

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
    // dispatch for PUT
    dispatch({ type: "UPDATE_SERVICES", payload: servicesObj });
  };

  return (
    <div>
      <MyStepper step={0} />
      <h2>Products I'm interested in...</h2>

      <form className="checkbox-container">
        <div>
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

          <Card>
            <CardMedia
              component="img"
              alt="Micro Market"
              height="200"
              image="https://www.bernicks.com/hubfs/social-suggested-images/micro_market.png"
            />
            <CardContent>
              <Typography variant="h6">Micro Market</Typography>
              <Typography variant="body2">
                Description: Your description here.
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div>
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

          <Card>
            <CardMedia
              component="img"
              alt="Smart Coolers"
              height="200"
              image="https://cdn-dppck.nitrocdn.com/mebfXXXDMymVFbKVdxsHUesbzFkXXUGk/assets/images/optimized/rev-434f8f1/connectvending.co.uk/wp-content/uploads/2023/04/PicoCooler-ProductScan-WebRes-sml.jpg"
            />
            <CardContent>
              <Typography variant="h6">Smart Coolers</Typography>
              <Typography variant="body2">
                Description: Your description here.
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div>
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
          <Card>
            <CardMedia
              component="img"
              alt="Snack Boxes"
              height="200"
              image="https://i.etsystatic.com/33431484/r/il/046fbf/5169950532/il_1588xN.5169950532_8ddb.jpg"
            />
            <CardContent>
              <Typography variant="h6">Snack Boxes</Typography>
              <Typography variant="body2">
                Description: Your description here.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </form>

      <button type="submit" value="Submit" onClick={handleSubmit}>
        NEXT
      </button>
    </div>
  );
}

export default ServiceChoicePage;
