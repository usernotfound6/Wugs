import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Columns from "./Columns";
import BasicSelect from "./BasicSelect";

function AdminPage() {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const admin = useSelector((store) => store.admin);
  console.log("In Admin page", admin);
  const columns = Columns(); // The actual Column is saved in Columns.js as its own component

  
  // This const is mapping over the admin reducer and setting the info found there as the tables row data
  const rows = admin?.map((client) => ({
    id: client.id,
    business_name: client.business_name,
    address: client.address,
    website: client.website,
    manager_id: client.manager_id,
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
    status_id: client.status_id,
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

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // Rest of your DataGrid configuration
        onRowClick={handleRowClick} // Attach the click handler to the rows
      />
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
          <BasicSelect/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ID: {selectedRowId} {/* Display the selected row's ID */}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminPage;
