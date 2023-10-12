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
import { PopupWidget } from "react-calendly";

// Path: /clientstatus



const theme = createTheme({
  palette: {
    mode: "dark", // or 'dark' for the dark theme
  },
});


function ReviewPage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const store = useSelector((store) => store);
  // const [heading, setHeading] = useState('Functional Component');
  const client = useSelector((store) => store.client);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const rootElement = document.getElementById("popup-root");

  const handleSubmit1 = () => {
    history.push('/servicechoice')
  }
  const handleSubmit2 = () => {
    history.push('/foodpreferences')
  }
  const handleSubmit3 = () => {
    history.push('/demographics')
  }
  const handleSubmit4 = () => {
    history.push('/clientlocationinfo')
  }


  return (
    <ThemeProvider theme={theme}>
      <div className="container">
      <MyStepper step={5} />
         <CssBaseline />
        <div style={{ textAlign: "center" }}>
        <Typography variant="h4" marginTop={3} style={{ color: "beige" }}>Review And Complete</Typography>
        <Typography variant="h6" marginTop={1} style={{ color: "beige" }}>
        Your Current Info With Wugs:</Typography>
          </div>{" "}
        <Container
          maxWidth="lg"
          sx={{
            width: "100%", // Custom width
            height: "60vh", // Custom height
            // Add any other custom styles here
          }}
        >
          <br />

          <Box>
            <Grid container spacing={1}>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ borderRadius: 3, height: 270, backgroundColor: '#484747', boxShadow: 5 }}>
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
                <Card variant="outlined" sx={{ borderRadius: 3, height: 270, backgroundColor: '#484747', boxShadow: 5 }}>
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
                      Location: {client.address}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Website: {client.website}
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
                <Card variant="outlined" sx={{ borderRadius: 3, height: 270, backgroundColor: '#484747', boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="beige"
                      gutterBottom
                    >
                      About Your Community:
                    </Typography>
                    <Typography variant="h8" component="div">
                      a;sldjf;lakjsdf;lajs;lkdfj
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
                <Card variant="outlined" sx={{ borderRadius: 3, height: 270, backgroundColor: '#484747', boxShadow: 5 }}>
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
            </Grid>
            <PopupWidget
              url="https://calendly.com/dontyellwillcry"
              rootElement={rootElement}
              text="Click here to schedule meeting!"
              textColor="beige"
              color="#00a2ff"
              style={{
                position: "absolute",
                top: "50px",
                left: "20px",

              }}
            />
            {/* </Box> */}
          </Box>
        </Container>
        <PopupWidget
          url="https://calendly.com/dontyellwillcry"
          rootElement={rootElement}
          text="Click here to schedule meeting!"
          textColor="beige"
          color="#00a2ff"
          style={{
            position: "absolute",
            top: "50px",
            left: "20px",

          }}
        />
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