import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import MyStepper from '../MyStepper/MyStepper'

function DemographicsPage() {

  return (
    <div>
      <MyStepper step={2}/>
      <h2>Demographics Page</h2>
    </div>
  );
}

export default DemographicsPage;