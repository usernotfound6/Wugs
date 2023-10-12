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
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MyStepper from "../MyStepper/MyStepper";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { PopupWidget } from "react-calendly";

// Path: /clientstatus

const theme = createTheme({
  palette: {
    mode: "dark", // or 'dark' for the dark theme
  },
});

function ReviewPage() {
  const client = useSelector((store) => store.client);
  const user = useSelector((store) => store.user);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const history = useHistory();
  const rootElement = document.getElementById("popup-root");

  const handleSubmit1 = () => {
    history.push('/servicechoice');
  }
  const handleSubmit2 = () => {
    history.push('/foodpreferences');
  }
  const handleSubmit3 = () => {
    history.push('/demographics');
  }
  const handleSubmit4 = () => {
    history.push('/clientlocationinfo');
  }

  const openCalendlyLink = () => {
    Calendly.initPopupWidget({ url: "https://calendly.com/dontyellwillcry" });
  };

  const handleConfirmSubmit = () => {
    setOpenConfirmation(false);
    history.push("/home");
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
    event.preventDefault();
  }

  console.log("client", client)

  return (
    <ThemeProvider theme={theme}>
      <div>
        <MyStepper step={5} />
        <CssBaseline />
        <div style={{ textAlign: "center" }}>
          <Typography variant='h4' marginTop={3} style={{ color: "beige" }}>Review Submission</Typography>
        </div>
        <Container
          maxWidth="lg"
          sx={{
            width: "100%", // Custom width
            height: "60vh", // Custom height
            // Add any other custom styles here
          }}
        >
          <div style={{ color: "beige", textAlign: "center" }}>
            <Typography variant='h6' marginTop={1} marginBottom={2}>Your Current Info With Wugs:</Typography>
          </div>
          <hr width={800} style={{ color: "beige" }} />
          <br />
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ borderRadius: 3, height: 300, backgroundColor: '#484747', boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="beige"
                      gutterBottom
                    >
                      Services:
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
                      <Button onClick={handleSubmit1}
                        sx={{
                          marginTop: 1.5,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="secondary"
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
                <Card variant="outlined" sx={{ borderRadius: 3, height: 300, backgroundColor: '#484747', boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="beige"
                      gutterBottom
                    >
                      Client Contact and Location:
                    </Typography>
                    <Typography variant="body2" component="div">
                      Point of Contact: {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Email: {user.username}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Phone: {client.phone}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Business: {client.business_name}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Street Address: {client.address_street}
                    </Typography>
                    <Typography variant="body2" component="div">
                      State: {client.address_state}
                    </Typography>
                    <Typography variant="body2" component="div">
                      State: {client.address_zip}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Website: {client.website}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Hours of Operation: {client.hours_of_operation}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Micro Market Location: {client.micromarket_location}
                    </Typography>
                    <Box textAlign={"right"}>
                      <Button onClick={handleSubmit4}
                        sx={{
                          margin: 'auto',
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="secondary"
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
                <Card variant="outlined" sx={{ borderRadius: 3, height: 300, backgroundColor: '#484747', boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="beige"
                      gutterBottom
                    >
                      About Your Community:
                    </Typography>
                    <Typography>
                      # of People on Site: {client.number_of_people}
                    </Typography>
                    <Typography>
                      Demographics: {client.demographics}
                    </Typography>
                    <Typography>
                      Age Group: {client.target_age_group}
                    </Typography>
                    <Typography>
                      Industry: {client.industry}
                    </Typography>
                    <Typography>
                      Neighborhood Info: {client.neighborhood_info}
                    </Typography>
                    <Box textAlign={"right"}>
                      <Button onClick={handleSubmit3}
                        sx={{
                          marginTop: 1.5,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="secondary"
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
                <Card variant="outlined" sx={{ borderRadius: 3, height: 300, backgroundColor: '#484747', boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="beige"
                      gutterBottom
                    >
                      Food Choices:
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
                      <Button onClick={handleSubmit2}
                        sx={{
                          marginTop: 1.5,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="secondary"
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
                <Card variant="outlined" sx={{ borderRadius: 3, height: 300, backgroundColor: '#484747', boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="beige"
                      gutterBottom
                    >
                      Additional Information:
                    </Typography>
                    <Typography>
                      Space dimensions: {client.dimensions}
                    </Typography>
                    <Typography>
                      Visit Requested: {client.wugs_visit ? "Yes" : "No"}
                    </Typography>
                    <Typography variant='subtitle2'>
                      If yes please schedule a meeting with Wugs
                    </Typography>

                    <Box textAlign={"right"}>
                      <Button onClick={openCalendlyLink}
                        sx={{
                          marginTop: 1.5,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="secondary"
                        variant="contained"
                        autoFocus
                      >
                        Schedule Meeting
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ borderRadius: 3, height: 300, backgroundColor: '#484747', boxShadow: 5 }}>
                  <CardContent>
                    <Box textAlign={"center"}>
                      <Button onClick={handleOpenConfirmation}
                        sx={{
                          marginTop: 1.5,
                          marginLeft: 2,
                          height: 50,
                          width: 200,
                          borderRadius: 1,
                        }}
                        color="secondary"
                        variant="contained"
                        autoFocus
                      >
                       CONFIRM AND SUBMIT
                      </Button>

                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          
          
        </Container>
        
        <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            background: "beige",
          },
        }}
      >
        
        <DialogTitle id="alert-dialog-title">
          Thank You For Expressing Interest!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We are so excited to bring diverse snacking options into your community and space!
            You will be contacted by Wugs soon with follow-up information. Once you click
            'Go Back' you will be redirected to the home page where you can view your current onboarding status and edit your profile.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmSubmit}
            color="success"
            variant="contained"
            autoFocus
          >
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
      </div>

      {/* Confirmation Dialog */}

      {/* <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            background: "beige",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Thank You For Expressing Interest!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will be emailed soon with follow-up information. Once you click
            'Go Back' you will be redirected to the home page where you can get
            started on the onboarding process.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmSubmit}
            color="success"
            variant="contained"
            autoFocus
          >
            Go Back
          </Button>
        </DialogActions>
      </Dialog> */}

    </ThemeProvider>
  );
}

export default ReviewPage;
