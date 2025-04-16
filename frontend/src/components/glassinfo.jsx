import { useParams, useNavigate } from "react-router-dom";
import { products } from "../dummy";
import { useState, useEffect, useContext } from "react";
import { AppData } from "../App";
import {
  Container,
  Button,
  Box,
  Stack,
  Grid,
  Typography,
  Paper,
  Rating,

} from "@mui/material";
import "../App.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
const GlassInfo = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [productdetails, setProductdetails] = useState({});
  const {
    mobile,
    priceconversion,
    state,
    dispatch,
    snackbar_item,
    add_to_wishlist,
    isItem_added_to_bag,
  } = useContext(AppData);
  useEffect(() => {
    const product = products?.find((el) => el.name === param?.eachitem);
    setProductdetails(product);
  }, [param.eachitem]);
  const {
    name,
    description,
    brand,
    category,
    gender,
    image,
    rating,
    price,
    newPrice,
    weight,
  } = productdetails;
  const wishbutton_text = state.wishlist?.find((el) => el.name === name)
    ? "Remove from wishlist"
    : "Add to wishlist";
  return (
    <Container sx={{ marginBlockStart: mobile ? 8 : 18 }}>
      <Stack
        direction={mobile ? "column" : "row"}
        justifyContent="space-around"
        alignItems="center"
        spacing={3}
      >
        <Box
          component="img"
          alt=""
          src={image}
          sx={{
            width: mobile ? "100%" : 500,
            height: mobile ? "100%" : 390,
            borderRadius: 0.8,
            padding: 2,
            backgroundColor: "#ecebe8",
          }}
        />
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "baseline",
            gap: 2,
            padding: 2,
            width: mobile ? "100%" : 500,
            height: 390,
          }}
        >
          <Typography variant="h4">{name}</Typography>
          <Typography variant="body1">{description}</Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1.2}
          >
            <Rating value={5} precision={0.5} readOnly size="small" />
            <Typography
              variant="body2"
              sx={{
                color: "#66676a",
              }}
            >
              ({rating}) Rating
            </Typography>
          </Stack>
          <Typography variant="body1">About Product</Typography>
          <Grid
            container
            sx={{
              gridTemplateColumns: "repeat(2,1fr)",
              display: "grid",
              gap: 1,
            }}
          >
            <Grid item>
              <Typography variant="body2">
                <span id="span">Brand</span>: {brand}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <span id="span">Gender</span>: {gender}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <span id="span">Category</span>: {category}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <span id="span">Heavy</span>: {weight}
              </Typography>
            </Grid>
          </Grid>
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Typography variant="body1">
              Price:{" "}
              <span style={{ color: "#dc7f2c" }}>{priceconversion(price)}</span>
            </Typography>
            <span>
              {" "}
              <strike>{priceconversion(newPrice)}</strike>
            </span>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1.6}
          >
            <Button
              variant="outlined"
              size="small"
              startIcon={<ShoppingBagIcon />}
              sx={{
                borderColor: "#252525",
                color: "#252525",
                borderRadius: 5,
                "&:hover": {
                  color: "black",
                  backgroundColor: "white",
                  borderColor: "#252525",
                },
              }}
              onClick={() => {
                if (state.cartItems.find((item) => item.name === name)) {
                  navigate("/paybag");
                } else {
                  dispatch({ type: "add-to-bag", payload: name });
                }
              }}
            >
              {isItem_added_to_bag(name)}
            </Button>
            <Button
              variant="contained"
              startIcon={<LoyaltyIcon />}
              size="small"
              sx={{
                color: "white",
                backgroundColor: "black",
                borderRadius: 5,
                "&:hover": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
              onClick={() => add_to_wishlist(name)}
            >
              {wishbutton_text}
            </Button>
          </Stack>
        </Paper>
      </Stack>
      {snackbar_item}
    </Container>
  );
};
export default GlassInfo;
