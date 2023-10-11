import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, Modal, InputLabel, MenuItem, FormControl, Select, TextField, Container } from '@mui/material';
import Columns from "./Columns";
import "./AdminPage.css";
import InterestedColumns from "./Interestedcolumns";

// Go back to here
function AdminPage() {

  const dispatch = useDispatch();
  const [selectedRowData, setSelectedRowData] = useState({
    id: "",
    business_name: "",
    first_name: "",
    last_name: "",
    phone: "",
    admin_notes: "",
  });

  const admin = useSelector((store) => store.admin);
  const interested = useSelector((store) => store.interested);

  const columns = Columns(); // The actual Column is saved in Columns.js as its own component
  const interestedColumns = InterestedColumns(); // The actual Column is saved in Columns.js as its own component

  // This const is mapping over the admin reducer and setting the info found there as the tables row data
  const rows = admin?.map((client) => ({
    id: client.client_id,
    status_name: client.status_name,
    status_id: client.status_id,
    admin_notes: client.admin_notes,
    last_active: client.last_active,
    business_name: client.business_name,
    address_street: client.address_street,
    address_city: client.address_city,
    address_state: client.address_state,
    address_zip: client.address_zip,
    website: client.website,
    first_name: client.first_name,
    last_name: client.last_name,
    phone: client.phone,
    number_of_people: client.number_of_people,
    industry: client.industry,
    hours_of_operation: client.hours_of_operation,
    contract: client.contract,
    demographics: client.demographics,
    dimensions: client.dimensions,
    micromarket_location: client.micromarket_location,
    neighborhood_info: client.neighborhood_info,
    pictures: client.pictures,
    product_types: client.product_types,
    service_names: client.service_names,
    target_age_group: client.target_age_group,
    username: client.username,
    website: client.website,
    wugs_visit: client.wugs_visit
  }));

  const interestedRows = interested?.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone_number: item.phone_number,
    industry: item.industry,
    why_wugs: item.why_wugs,
    about_you: item.about_you,
  }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [input, setInput] = useState("");

  // Function to handle row click event
  const handleRowClick = (params) => {
    setStatus(params.row.status_id || "1"); // Set the status to the value from the selected row or a default value
    setSelectedRowData(params.row); // Set the entire row data
    handleOpen(); // Open the modal when a row is clicked
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dropdown = (event) => {
    setStatus(event.target.value);
  };

  const inputField = (event) => {
    setInput(event.target.value);
  };

  function editClient() {
    dispatch({
      type: "UPDATE_CLIENT",
      payload: {
        admin_notes: input,
        status_id: status,
        id: selectedRowData.id,
      },
    });
    dispatch({
      type: "FETCH_USER"
    });
  }

  function deleteClient() {
    dispatch({
      type: "DELETE_CLIENT",
      payload: {
        id: selectedRowData.id,
      },
    });
    dispatch({
      type: "FETCH_USER"
    });
  }

  return (
    <Container fixed sx={{ backgroundColor: "#fefefe" }}>
      <h1>Client Table</h1>
      <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} />

      {/* -----------  MODAL START ----------- */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          
        <Box sx={style} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '16px', gridTemplateAreas: '"contact business" "additional extra"' }}>
          {/* Contact Information */}
          <div style={{ gridArea: 'contact' }}>
            <Typography variant="h6">Contact Information</Typography>
            <ul>
              <li>Business: {selectedRowData.business_name}</li>
              <li>Name: {selectedRowData.first_name}, {selectedRowData.last_name}</li>
              <li>Username/Email: {selectedRowData.username}</li>
              <li>Phone #: {selectedRowData.phone}</li>
            </ul>
          </div>

          {/* Business Information */}
          <div style={{ gridArea: 'business' }}>
            <Typography variant="h6">Business Information</Typography>
            <ul>
              <li>Address: {selectedRowData.address_street}</li>
              <li>City: {selectedRowData.address_city}, {selectedRowData.address_state} {selectedRowData.address_zip}</li>
              <li>Industry: {selectedRowData.industry}</li>
              <li>Website: {selectedRowData.website}</li>
              <li>Number of People: {selectedRowData.number_of_people}</li>
              <li>Hours of Operation: {selectedRowData.hours_of_operation}</li>
            </ul>
          </div>

          {/* Additional Client/Building Information */}
          <div style={{ gridArea: 'additional' }}>
            <Typography variant="h6">Additional Client/Building Information</Typography>
            <ul>
              <li>Demographics: {selectedRowData.demographics}</li>
              <li>Neighborhood Info: {selectedRowData.neighborhood_info}</li>
              <li>Micro-Market Location in Business: {selectedRowData.micromarket_location}</li>
              <li>Market Space Dimensions: {selectedRowData.dimensions}</li>
              <li>
                Product Types Interested In:
                {selectedRowData.product_types ? (
                  <ul>
                    {selectedRowData.product_types.map((type, index) => (
                      <li key={index}>{type}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No product types available.</p>
                )}
              </li>
              <li>
                Services Interested In:
                {selectedRowData.service_names ? (
                  <ul>
                    {selectedRowData.service_names.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No service names available.</p>
                )}
              </li>

              <li>Target Age Group: {selectedRowData.target_age_group}</li>
            </ul>
          </div>

          {/* Extra Info Provided */}
          <div style={{ gridArea: 'extra' }}>
            <Typography variant="h6">Extra Info Provided</Typography>
            <ul>
              <li>
                Pictures:
                {selectedRowData.pictures ? (
                  <ul>
                    {selectedRowData.pictures.map((url, index) => (
                      <li key={index}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          Picture {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No pictures provided.</p>
                )}
              </li>
              <li>
                Contract:
                {selectedRowData.contract ? (
                  <ul>
                    <a href={selectedRowData.contract} target="_blank" rel="noopener noreferrer">
                      Document
                    </a>
                  </ul>
                ) : (
                  <p>No contract on file.</p>
                )}
              </li>
              <li>Wugs Visit Requested: {selectedRowData.wugs_visit}</li>
            </ul>
          </div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={dropdown}
              >
                <MenuItem value={1}>Onboarding Incomplete</MenuItem>
                <MenuItem value={2}>Pending Wugs Approval</MenuItem>
                <MenuItem value={3}>Render In Progress</MenuItem>
                <MenuItem value={4}>Contract Sent Awaiting Completion</MenuItem>
                <MenuItem value={5}>Pending Contract Approval</MenuItem>
                <MenuItem value={6}>Account Active</MenuItem>
                <MenuItem value={7}>Account Inactive</MenuItem>
              </Select>
              <TextField
                id="filled-multiline-static"
                label="Client Notes"
                multiline
                rows={4}
                variant="filled"
                value={input}
                onChange={inputField}
              />
              <Button onClick={editClient}>Submit</Button>
              <Box>
                <Button onClick={deleteClient}>Delete</Button>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Modal>

      {/* -----------  MODAL END ----------- */}

      {/* ..................USER Table................... */}

      <h1>Interested Table</h1>

      <DataGrid
        rows={interestedRows}
        columns={interestedColumns}
        // onRowClick={handleButtonClick}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 5 },
        //   },
        // }}
        pageSizeOptions={[5, 10]}
      />
    </Container>
  );
}

export default AdminPage;
