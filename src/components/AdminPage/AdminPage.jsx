import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Columns from "./Columns";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

function AdminPage() {
  const dispatch = useDispatch();
  const [selectedRowId, setSelectedRowId] = useState(null);
  const admin = useSelector((store) => store.admin);
  console.log("In Admin page", admin);
  const columns = Columns(); // The actual Column is saved in Columns.js as its own component

  // This const is mapping over the admin reducer and setting the info found there as the tables row data
  const rows = admin?.map((client) => ({
    id: client.client_id,
    business_name: client.business_name,
    address: client.address,
    website: client.website,
    first_name: client.first_name,
    last_name: client.last_name,
    phone: client.phone,
    hours_of_operation: client.hours_of_operation,
    micromarket_location: client.micromarket_location,
    neighborhood_info: client.neighborhood_info,
    demographics: client.demographics,
    number_of_people: client.number_of_people,
    target_age_group: client.target_age_group,
    industry: client.industry,
    pictures: client.pictures,
    dimensions: client.dimensions,
    wugs_visit: client.wugs_visit,
    contract: client.contract,
    admin_notes: client.admin_notes,
    status_id: client.status_name,
  }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);

  // Function to handle row click event
  const handleRowClick = (params) => {
    setSelectedRowId(params.id);
    handleOpen(); // Open the modal when a row is clicked
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [status, setStatus] = React.useState("");
  const [input, setInput] = React.useState("");

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
        id: selectedRowId,
      },
    });
  }

  function deleteClient() {
    dispatch({
      type: "DELETE_CLIENT",
      payload: {
        id: selectedRowId,
      },
    });
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          {/* <BasicSelect/> */}
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
              <div style={{ marginTop: "20px" }}>
                <TextField
                  id="filled-multiline-static"
                  label="Client Notes"
                  multiline
                  rows={4}
                  variant="filled"
                  onChange={inputField}
                />
              </div>
              <Button onClick={editClient}>Submit</Button>
              <Button onClick={deleteClient}>Delete</Button>
            </FormControl>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ID: {selectedRowId}
          </Typography>
        </Box>
      </Modal>
      {/* ..................USER Table................... */}
      <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          {/* <BasicSelect/> */}
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
              <div style={{ marginTop: "20px" }}>
                <TextField
                  id="filled-multiline-static"
                  label="Client Notes"
                  multiline
                  rows={4}
                  variant="filled"
                  onChange={inputField}
                />
              </div>
              <Button onClick={editClient}>Submit</Button>
              <Button onClick={deleteClient}>Delete</Button>
            </FormControl>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ID: {selectedRowId}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminPage;
