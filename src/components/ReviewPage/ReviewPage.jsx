import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { InlineWidget, PopupWidget, PopupButton } from "react-calendly";

// Path: /review

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name Review with the name for the new component.
function ReviewPage() {
  const rootElement = document.getElementById("popup-root");

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const store = useSelector((store) => store);
  // const [heading, setHeading] = useState('Functional Component');

  return (
    // <div className="App">
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
        <Box sx={{ bgcolor: "#fefefe", height: "80vh", width: "100%" }}>
          <header
            className="App-header"
            style={{
              textAlign: "center", // Center text horizontally
              margin: "50px 0", // Add top and bottom margins
              padding: "30px"
            }}
          >
            {/* Your other content */}Review and Schedule apppointment
          </header>

          <PopupWidget
            url="https://calendly.com/dontyellwillcry"
            rootElement={rootElement}
            text="Click here to schedule!"
            textColor="#ffffff"
            color="#00a2ff"
            style={{
              // position: 'absolute', // Use absolute positioning
              top: '50px',          // Adjust the top position as needed
              left: '20px',         // Adjust the left position as needed
            }}
          />
          
        </Box>
      </Container>
    </div>
  );
}

export default ReviewPage;
