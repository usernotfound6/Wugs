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
import { Typography } from "@mui/material";


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
      <div className='container'>
        <style type="text/css">
          {/* {`
          .calendly-badge-widget { 
            left: 50% !important; 
            margin-left: -100px !important; 
            margin-bottom: 200px;
          }
        `} */}
        </style>
        <Typography 
            variant= 'h5' 
            style={{ 
              textAlign: "left",
              margin: 'auto',
              padding: "5px",
              color: 'beige',
            }}
          >
            Current Status: {client.status_name}
          </Typography>
        <CssBaseline />
        <div style={{ textAlign: "center" }}>
          <Typography variant='h4' marginTop={3}  marginBottom={2} style={{ color: "beige" }}>Current Information</Typography>
        </div>{" "}
        <hr width={800} style={{ color: "beige" }}/>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Services I'm interested in..." />
            <Tab label="Who we are..." />
            <Tab label="Foods we're interested in..." />
            <Tab label="Who we're serving..." />
            <Tab label="Additional info" />
          </Tabs>
        </div>
        <Container
          maxWidth="lg"
          // sx={{
          //   width: "100%",
          //   height: "70vh",
          // }}
        >
          {value === 0 && <TabContentOne />}
          {value === 1 && <TabContentThree />}
          {value === 2 && <TabContentTwo />}
          {value === 3 && <TabContentFive />}
          {value === 4 && <TabContentFour />}
        </Container>


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
