import React from "react";
import AdminClientTable from "./AdminClientTable";
import AdminInterestedTable from "./AdminInterestedTable";
import "./AdminPage.css";
import { Box, Typography } from "@mui/material";

// Go back to here
function AdminPage() {

  // const admin = useSelector((store) => store.admin);
  // const interested = useSelector((store) => store.interested);

  // const columns = Columns(); // The actual Column is saved in Columns.js as its own component
  // const interestedColumns = InterestedColumns(); // The actual Column is saved in Columns.js as its own component

  // This const is mapping over the admin reducer and setting the info found there as the tables row data
  // const rows = admin?.map((client) => ({
  //   id: client.client_id,
  //   status_name: client.status_name,
  //   status_id: client.status_id,
  //   admin_notes: client.admin_notes,
  //   last_active: client.last_active,
  //   business_name: client.business_name,
  //   address_street: client.address_street,
  //   address_city: client.address_city,
  //   address_state: client.address_state,
  //   address_zip: client.address_zip,
  //   website: client.website,
  //   first_name: client.first_name,
  //   last_name: client.last_name,
  //   phone: client.phone,
  //   number_of_people: client.number_of_people,
  //   industry: client.industry,
  //   hours_of_operation: client.hours_of_operation,
  //   contract: client.contract,
  //   demographics: client.demographics,
  //   dimensions: client.dimensions,
  //   micromarket_location: client.micromarket_location,
  //   neighborhood_info: client.neighborhood_info,
  //   pictures: client.pictures,
  //   product_types: client.product_types,
  //   service_names: client.service_names,
  //   target_age_group: client.target_age_group,
  //   username: client.username,
  //   website: client.website,
  //   wugs_visit: client.wugs_visit
  // }));

  // const interestedRows = interested?.map((item) => ({
  //   id: item.id,
  //   name: item.name,
  //   email: item.email,
  //   phone_number: item.phone_number,
  //   industry: item.industry,
  //   why_wugs: item.why_wugs,
  //   about_you: item.about_you,
  // }));

  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   height: 800,
  //   width: 1000,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  // };

  // const [open, setOpen] = useState(false);
  // const [status, setStatus] = useState("");
  // const [input, setInput] = useState(selectedRowData.admin_notes || "");

  // // Function to handle row click event
  // const handleRowClick = (params) => {
  //   setSelectedRowData(params.row); // Set the entire row data
  //   setStatus(params.row.status_id || "1"); // Set the status to the value from the selected row or a default value
  //   setInput(params.row.admin_notes); // Set the input state with admin_notes from the selected row
  //   handleOpen(); // Open the modal when a row is clicked
  // };

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const dropdown = (event) => {
  //   setStatus(event.target.value);
  // };

  // const inputField = (event) => {
  //   setInput(event.target.value);
  // };

  // function editClient() {
  //   dispatch({
  //     type: "UPDATE_CLIENT",
  //     payload: {
  //       admin_notes: input,
  //       status_id: status,
  //       id: selectedRowData.id,
  //     },
  //   });
  //   dispatch({
  //     type: "FETCH_USER"
  //   });
  // }

  // function deleteClient() {
  //   dispatch({
  //     type: "DELETE_CLIENT",
  //     payload: {
  //       id: selectedRowData.id,
  //     },
  //   });
  //   dispatch({
  //     type: "FETCH_USER"
  //   });
  // }

  return (
    <div className="container">
      <Box style={{ textAlign: "center" }}>
        <Typography variant='h4' marginTop={0} marginBottom={4} style={{ color: "beige" }}>Admin View</Typography>
      </Box>
      <AdminClientTable />
      <AdminInterestedTable />
    </div>
  );
}

export default AdminPage;

