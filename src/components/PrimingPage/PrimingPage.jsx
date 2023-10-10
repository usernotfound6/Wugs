import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FastfoodIcon from "@mui/icons-material/Fastfood";

// Path: /priming

function PrimingPage() {
  const history = useHistory();

  const styles = {
    cardContainer: {
      maxWidth: "42%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "auto",
    },
    card: {
      maxWidth: "100%",
      borderRadius: 4,
      padding: 1,
      backgroundColor: "#484747",
    },
  };

  return (
    <>
      <Typography
        style={{ textAlign: "center" }}
        variant="h4"
        color="beige"
        gutterBottom
      >
        WELCOME!
      </Typography>
      <Box sx={styles.cardContainer}>
        <Card sx={styles.card}>
          <CardContent>
            {/* <Typography style={{ textAlign: "center" }} variant="h2" color="beige" gutterBottom>
                  WELCOME SNACKER!
                </Typography> */}

            <Typography
              style={{ textAlign: "center" }}
              color="beige"
              variant="h5"
              component="div"
              marginBottom={2}
            >
              WE'RE HERE TO HELP  <br /> YOUR ONBOARDING EXPERIENCE
            </Typography>
            <hr color="beige" />
            <Typography
              style={{ textAlign: "center" }}
              variant="body1"
              sx={{ mb: 1.5 }}
              color="beige"
            >
              Here are some things to have ready to complete the process with
              ease:
            </Typography>
            <hr color="beige" />
            <Typography
              style={{ textAlign: "center" }}
              color="beige"
              variant="body2"
            >
              Pictures of your space
              <br />
              Dimensions of you space
              <br />
              Details about you location
              <br />
              ????
              <br />
              ????
              <br />
              ???????
              <br />
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              variant="contained"
              color="success"
              onClick={() => {
                history.push("/servicechoice");
              }}
            >
              <FastfoodIcon style={{ padding: 6 }} /> GET SNACKING!
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default PrimingPage;
