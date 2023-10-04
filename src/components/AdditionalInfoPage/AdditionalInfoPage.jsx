import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import MyStepper from '../MyStepper/MyStepper'


function AdditionalInfoPage() {


  return (
    <div>
      <MyStepper step={4}/>
      <h2>Additional Info</h2>
    </div>
  );
}

export default AdditionalInfoPage;