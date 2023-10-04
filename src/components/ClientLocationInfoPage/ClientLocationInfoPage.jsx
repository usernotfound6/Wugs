import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import MyStepper from '../MyStepper/MyStepper'

  function ClientLocationInfoPage() {

  return (


    <div>
      <MyStepper step={1}/>
      <h2>Client Location Form</h2>
    </div>
  );
}

export default ClientLocationInfoPage;