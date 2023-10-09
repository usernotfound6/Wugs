import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Columns from "./Columns";
import "./AdminPage.css";
import InterestedColumns from "./Interestedcolumns";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
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
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);

  // Function to handle row click event
  const handleRowClick = (params) => {
    setSelectedRowData(params.row); // Set the entire row data
    handleOpen(); // Open the modal when a row is clicked
  };
  console.log("state", selectedRowData)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [status, setStatus] = React.useState("6");
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
        id: selectedRowData.id,
      },
    });
  }

  function deleteClient() {
    dispatch({
      type: "DELETE_CLIENT",
      payload: {
        id: selectedRowData.id,
      },
    });
  }
  // console.log("asdfasfd", admin[1].business_name)
  

  return (
    <Container fixed sx={{ backgroundColor: "#fefefe" }}>
      <h1>Client Table</h1>
      <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color={"black"}>
            Details
            <ul>
              <li>Business: {selectedRowData.business_name}</li>
              <li>Name: {selectedRowData.first_name}, {selectedRowData.last_name}</li>
              <li>Phone #: {selectedRowData.phone}</li>
              </ul>
              <Typography>
                {selectedRowData.admin_notes}
              </Typography>
          </Typography>
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
                onChange={inputField}
              />
              <Button onClick={editClient}>Submit</Button>
              <Button onClick={deleteClient}>Delete</Button>
            </FormControl>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* ID: {selectedRowId} */}
          </Typography>
        </Box>
      </Modal>
      {/* ..................USER Table................... */}

      <h1>Interested Table</h1>

      <DataGrid
        rows={interestedRows}
        columns={interestedColumns}
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
