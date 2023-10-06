import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Columns from "./Columns";

function AdminPage() {
  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);

  const admin = useSelector((store) => store.admin);
  console.log("In Admin page", admin);
  const columns = Columns(); // Use the Columns component to get the column definitions


  

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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCheckboxClick = (rowId) => {
    console.log(rowId)
    // Toggle the selected state of the clicked row
    if (selectedRowIds.includes(rowId)) {
      setSelectedRowIds(selectedRowIds.filter((id) => id !== rowId));
    } else {
      setSelectedRowIds([...selectedRowIds, rowId]);
    }

    // Open the modal if at least one row is selected
    if (selectedRowIds.length === 0) {
      handleClose();
    } else {
      handleOpen();
    }
  };

    

    
  
  return (
   
    <div style={{ height: 400, width: "100%" }}>
      
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection  // Enable built-in checkboxes
        onSelectionModelChange={(newSelection) => {
          setSelectedRowIds(newSelection.selectionModel);
        }}
        onRowClick={(params) => {
          // Handle row click event (optional)
          handleCheckboxClick(params.id);
        }}
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      
    </div>
  );
}

export default AdminPage;
