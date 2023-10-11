import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory } from "react-router-dom";
import TabContentOne from "./TabContentOne";
import TabContentTwo from "./TabContentTwo";
import TabContentThree from "./TabContentThree";
import TabContentFour from "./TabContentFour";
import TabContentFive from "./TabContentFive";
import { Tab, Tabs, Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PopupWidget } from "react-calendly";

// Path: /review

const theme = createTheme({
  palette: {
    mode: "dark", // or 'dark' for the dark theme
  },
});

function ClientStatusPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const client = useSelector((store) => store.client);
  const rootElement = document.getElementById("popup-root");

  console.log("Here is the client", client);

  function handlePrevious(path) {
    console.log("inside handlePrevious");
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "beige" }}>Review and Schedule Appointment</h1>
        </div>{" "}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Products I'm interested in.." />
            <Tab label="Foods we're interested in.." />
            <Tab label="Who we are..." />
            <Tab label="Additional info" />
            <Tab label="Who we're serving.." />
          </Tabs>
        </div>
        <Container
          maxWidth="lg"
          sx={{
            width: "100%",
            height: "70vh",
          }}
        >
          {value === 0 && <TabContentOne />}
          {value === 1 && <TabContentTwo />}
          {value === 2 && <TabContentThree />}
          {value === 3 && <TabContentFour />}
          {value === 4 && <TabContentFive />}
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

      </div>
    </ThemeProvider>
  );
}

export default ClientStatusPage;
