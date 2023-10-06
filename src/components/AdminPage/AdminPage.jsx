import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name Admin with the name for the new component.
function AdminPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_CLIENTS' });
    // if (user.admin) {
    //   dispatch({ type: 'FETCH_ALL_CLIENTS' })
    // } else {
    //   dispatch({ type: 'FETCH_CLIENT', payload: user.id })
    // }
  }, []);
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const store = useSelector((store) => store);
  // const [heading, setHeading] = useState('Functional Component');
    const allClients = useSelector((store) => store.allClients);
    console.log("In Admin page", allClients)

  return (
    <div>
      <h2>Admin Page</h2>
    </div>
  );
}

export default AdminPage;