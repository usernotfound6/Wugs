import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useSelector } from "react-redux";
import { InlineWidget, PopupWidget, PopupButton } from "react-calendly";

// Path: /review
const theme = createTheme({
  palette: {
    mode: "dark", // or 'dark' for the dark theme
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ReviewPage() {
  const history = useHistory();

  const rootElement = document.getElementById("popup-root");

  function handlePrevious(path) {
    switch (path) {
      case "/servicechoice":
        history.push("/servicechoice");
        break;
      case "/foodpreferences":
        history.push("/foodpreferences");
        break;
      case "/clientlocationinfo":
        history.push("/clientlocationinfo");
        break;
      case "/additionalinfo":
        history.push("/additionalinfo");
        break;
      case "/demographics":
        history.push("/demographics");
        break;
      default:
      // code block? Not sure what to add for default
    }
  }

  // const store = useSelector((store) => store);
  // const [heading, setHeading] = useState('Functional Component');

  return (
    // <div className="App">
    <ThemeProvider theme={theme}>
      <div>
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
          <Box
            sx={{
              bgcolor: "rgba(255, 235, 180, 0.5)",
              height: "80vh",
              width: "100%",
            }}
          >
            <header
              className="App-header"
              style={{
                textAlign: "center", // Center text horizontally
                margin: "50px 0", // Add top and bottom margins
                padding: "30px",
              }}
            >
              {/* Your other content */}Review and Schedule apppointment
            </header>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={12}>
                <Grid item xs={6} md={4}>
                  <Typography onClick={() => handlePrevious("/servicechoice")}>
                    Products I'm interested in..
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography
                    onClick={() => handlePrevious("/foodpreferences")}
                  >
                    Foods we're interested in..
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography
                    onClick={() => handlePrevious("/clientlocationinfo")}
                  >
                    Who we are..
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography onClick={() => handlePrevious("/additionalinfo")}>
                    Additional info
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography onClick={() => handlePrevious("/demographics")}>
                    Who we're serving..
                  </Typography>
                </Grid>
              </Grid>
            </Box>

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

export default ReviewPage;
