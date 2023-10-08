import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyStepper from '../MyStepper/MyStepper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

// Path: /foodpreferences

const ImageButton = styled(ButtonBase)(({ theme, isclicked }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
  // Apply hover styles to the clicked button
  ...(isclicked && {
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  }),
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

function FoodPreferencesPage() {

  const [clickedButtons, setClickedButtons] = useState([]);

  // console.log("ClickedButtons", clickedButtons)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_PRODUCTS' });
  }, [dispatch]);

  const products = useSelector((store) => store.products.data);
  const client = useSelector((store) => store.client)

  console.log("client id=", client.client_id)

  const handleClick = (productId) => {
    // Toggle the clicked state for the clicked button
    const updatedClickedButtons = clickedButtons.includes(productId)
      ? clickedButtons.filter((id) => id !== productId)
      : [...clickedButtons, productId];

    setClickedButtons(updatedClickedButtons);
  };

  const handleSave = () => {
    // Send the clickedButtons data in a payload
    const payload = {
      clickedButtons: clickedButtons,
      client_id: client.client_id
    };

    console.log('Clicked Buttons:', clickedButtons);
    // Dispatch an action with the payload to save the data
    dispatch({ type: 'UPDATE_FOOD_PREFERENCES', payload });
  };

  return (
    <div>
      <MyStepper step={3} />
      <h2>Food Preferences</h2>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <ImageButton
              focusRipple
              key={product.id}
              onClick={() => handleClick(product.id)}
              style={{
                width: '20em',
              }}
              isclicked={clickedButtons.includes(product.id)}
            >
              <ImageSrc style={{ backgroundImage: `url(${product.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {product.type}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </Box>
      <button onClick={handleSave}>Save Clicked Buttons</button>
    </div>
  );
}

export default FoodPreferencesPage;
