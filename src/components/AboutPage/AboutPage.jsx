import React from "react";
import { Typography } from "@mui/material";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
        <div style={{ textAlign: "center" }}>
        <Typography variant= 'h4' marginTop={3} marginBottom={3} style={{ color: "beige" }}>About Us</Typography>
      </div>{" "}
      <hr width={200} style={{ marginBottom: 40, color: "beige" }}/>
      <div>
      <img
      src="https://thumb.tildacdn.com/tild6135-6332-4735-b064-643336306437/-/format/webp/IMG_5076.jpg"
      style={{ display: 'flex', margin: 'auto', height: 500, borderRadius: '15px' }}
      alt="Your Image"
    />
        <div style={{ textAlign:'center', margin:'auto', height: 140, width: 360}}>
        <p>
          Wugs spurs inclusivity through global foods and beverages. Our
          convenient self-checkout markets serve to celebrate the diversity of
          your workplace. Our grab & go markets and smart fridges offer
          everything from delicious fresh sushi to flavorful Jarritos, plantain
          chips, and halal options.
        </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
