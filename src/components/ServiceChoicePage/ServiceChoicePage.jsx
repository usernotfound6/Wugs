import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MyStepper from '../MyStepper/MyStepper'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function ServiceChoicePage() {

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

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
    // console.log("micromarket checked?", micromarketChecked);
    // console.log("smartcoolers checked?", smartcoolersChecked);
    // console.log("snackboxes checked?", snackboxesChecked);
    let servicesArray = [];
    if (micromarketChecked) {
      servicesArray.push(1);
    }
    
    history.push('/locationinfo')

    if (smartcoolersChecked) {
      servicesArray.push(2);
    }
    if (snackboxesChecked) {
      servicesArray.push(3);
    }
    // let servicesObj = {
    //   client_id: // client.id, <-- needs to be client ID not user ID!!
    //   service_id: servicesArray,
    // }
    // console.log(servicesArray);

    // dispatch goes here for PUT
    // dispatch({ type: 'UPDATE_SERVICES', payload: servicesObj })
  }

  

  return (
    <div>
      <MyStepper step={0} />
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
        <label htmlFor="micromarket">Micro Markets</label><br />

        <input
          type="checkbox"
          id="smartcoolers"
          name="smartcoolers"
          value="SmartCoolers"
          checked={smartcoolersChecked}
          onChange={handleSmartcoolersChange}
        />
        <label htmlFor="smartcoolers">Smart Coolers</label><br />

        <input
          type="checkbox"
          id="snackboxes"
          name="snackboxes"
          value="SnackBoxes"
          checked={snackboxesChecked}
          onChange={handleSnackboxesChange}
        />
        <label htmlFor="snackboxes">Snack Boxes</label><br />

        <button type="submit" value="Submit" onClick={handleSubmit}>NEXT</button>
      </form>

    </div>
  );
}

export default ServiceChoicePage;