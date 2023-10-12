import React, { useState } from "react";
import AdminClientTable from "./AdminClientTable";
import AdminInterestedTable from "./AdminInterestedTable";
import "./AdminPage.css";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";

// Go back to here
function AdminPage() {

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <Box style={{ textAlign: "center" }}>
        <Typography variant='h4' marginTop={0} marginBottom={4} style={{ color: "beige" }}>Admin View</Typography>
      </Box>
      <hr width={800} style={{ color: "beige" }} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Onboarding Clients" />
          <Tab label="Interested in Wugs" />
        </Tabs>
      </div>
      <Container
          maxWidth="lg"
        // sx={{
        //   width: "100%",
        //   height: "70vh",
        // }}
        >
          {value === 0 && <AdminClientTable />}
          {value === 1 && <AdminInterestedTable />}
        </Container>
    
    </div>
  );
}

export default AdminPage;

