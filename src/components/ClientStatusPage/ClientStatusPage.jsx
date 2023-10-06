import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { InlineWidget, PopupWidget, PopupButton } from "react-calendly";
import { Button } from '@mui/material';

// Path: /clientstatus

const theme = createTheme({
  palette: {
    mode: "dark", // or 'dark' for the dark theme
  },
});

function ClientStatusPage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const store = useSelector((store) => store);
  // const [heading, setHeading] = useState('Functional Component');
  const client = useSelector((store) => store.client);
  const user = useSelector((store) => store.user);
  const rootElement = document.getElementById("popup-root");

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h2>Client Status Page</h2>

        <style type="text/css">
          {`
          .calendly-badge-widget { 
            left: 50% !important; 
            margin-left: -100px !important; 
            margin-bottom: 200px;
          }
        `}
        </style>
        <CssBaseline />
        <Container
          maxWidth="lg"
          sx={{
            width: "100%", // Custom width
            height: "70vh", // Custom height
            // Add any other custom styles here
          }}
        >
          {/* <Box
            sx={{
              bgcolor: "rgba(255, 225, 160, 0.4)",
              height: "80vh",
              width: "100%",
            }}
          > */}
          <header
            className="App-header"
            style={{
              fontSize: "1.75em",
              fontWeight: "bold",
              textAlign: "center", // Center text horizontally
              margin: "50px 0 0 0", // Add top and bottom margins
              padding: "30px",
            }}
          >
            Current status: {client.status_name}
          </header>

          <div style={{ textAlign: "center" }}><h2>Your Info with Wugs:</h2></div>
          <hr />
          <br />

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={12}>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ backgroundColor: 'rgba(243, 207, 42, 0)', boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Contact Info
                    </Typography>
                    <Typography variant="h8" component="div">
                      Point of Contact: {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="h8" component="div">
                      Email: {user.username}
                    </Typography>
                    <Typography variant="h8" component="div">
                      Phone: {client.phone}
                    </Typography>
                    <Typography variant="h8" component="div">
                      Location: {client.business_name}
                    </Typography>
                    <Box textAlign={"right"}>
                      <Button
                        sx={{
                          marginTop: 1.5,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="primary"
                        variant="contained"
                        autoFocus
                      >
                        Edit
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ backgroundColor: 'rgba(243, 207, 42, 0)', boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Products I'm interested in..
                    </Typography>
                    {client.service_names ?
                      client.service_names.map((service, index) => (
                        <Typography variant="h8" component="div" key={index}>
                          {service}
                        </Typography>
                      ))
                      :
                      <Typography variant="h8" component="div">
                        None Indicated
                      </Typography>
                    }
                    <Box textAlign={"right"}>
                      <Button
                        sx={{
                          marginTop: 1.5,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="primary"
                        variant="contained"
                        autoFocus
                      >
                        Edit
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ backgroundColor: 'rgba(243, 207, 42, 0)', boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Foods we're interested in..
                    </Typography>
                    {client.product_types ?
                      client.product_types.map((product, index) => (
                        <Typography variant="h8" component="div" key={index}>
                          {product}
                        </Typography>
                      ))
                      :
                      <Typography variant="h8" component="div">
                        None Indicated
                      </Typography>
                    }
                    <Box textAlign={"right"}>
                      <Button
                        sx={{
                          marginTop: 1.5,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="primary"
                        variant="contained"
                        autoFocus
                      >
                        Edit
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ backgroundColor: 'rgba(243, 207, 42, 0)', boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Vending Users at Your Location
                    </Typography>
                    <Typography variant="h8" component="div">
                      a;sldjf;lakjsdf;lajs;lkdfj
                    </Typography>
                    <Box textAlign={"right"}>
                      <Button
                        sx={{
                          marginTop: 1.5,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="primary"
                        variant="contained"
                        autoFocus
                      >
                        Edit
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ backgroundColor: 'rgba(243, 207, 42, 0)', boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Who we're serving..
                    </Typography>
                    <Typography variant="h8" component="div">
                      a;sldjf;lakjsdf;lajs;lkdfj
                    </Typography>
                    <Box textAlign={"right"}>
                      <Button
                        sx={{
                          marginTop: 1.5,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="primary"
                        variant="contained"
                        autoFocus
                      >
                        Edit
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {/* </Box> */}

            <PopupWidget
              url="https://calendly.com/dontyellwillcry"
              rootElement={rootElement}
              text="Click here to schedule!"
              textColor="#ffffff"
              color="#00a2ff"
              style={{
                position: "absolute",
                top: "50px",
                left: "20px",
              }}
            />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default ClientStatusPage;