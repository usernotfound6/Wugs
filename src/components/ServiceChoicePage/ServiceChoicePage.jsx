import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Stepper from '../Stepper/Stepper'

// Path: /servicechoice

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ServiceChoicePage() {

  const [micromarketChecked, setMicromarketChecked] = useState(false);
  const [smartcoolersChecked, setSmartcoolersChecked] = useState(false);
  const [snackboxesChecked, setSnackboxesChecked] = useState(false);

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
    console.log("micromarket checked?", micromarketChecked);
    console.log("smartcoolers checked?", smartcoolersChecked);
    console.log("snackboxes checked?", snackboxesChecked);

    let servicesObj = {
      micro_market: micromarketChecked,
      smart_cooler: smartcoolersChecked,
      snack_boxes: snackboxesChecked
    }


  }

  return (
    <div>
      <Stepper/>
      <h2>Products I'm interested in...</h2>

      <form>
        <input
          type="checkbox"
          id="micromarket"
          name="micromarket"
          value="Micromarket"
          checked={micromarketChecked}
          onChange={handleMicromarketChange}
        />
        <label for="micromarket">Micro Markets</label><br />

        <input
          type="checkbox"
          id="smartcoolers"
          name="smartcoolers"
          value="SmartCoolers"
          checked={smartcoolersChecked}
          onChange={handleSmartcoolersChange}
        />
        <label for="smartcoolers">Smart Coolers</label><br />

        <input
          type="checkbox"
          id="snackboxes"
          name="snackboxes"
          value="SnackBoxes"
          checked={snackboxesChecked}
          onChange={handleSnackboxesChange}
        />
        <label for="snackboxes">Snack Boxes</label><br />

        <button type="submit" value="Submit" onClick={handleSubmit}>NEXT</button>
      </form>

    </div>
  );
}

export default ServiceChoicePage;