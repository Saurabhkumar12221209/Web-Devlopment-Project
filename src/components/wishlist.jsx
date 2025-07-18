import { useContext} from "react";
import { AppData } from "../App";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  Divider,
  CardMedia,
  Rating,
  IconButton,
  Button,
  Grid,
  Box
} from "@mui/material";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const WishList = () => {
  const { state, mobile, priceconversion, dispatch, isItem_added_to_bag }=useContext(AppData);
  const navigate = useNavigate();
  return (
    <Container sx={{ marginBlockStart: mobile ? 10 : 12 }}>
      {state?.wishlist?.length === 0 ? (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <LazyLoadImage
            alt=""
            height={mobile ? 300 : 400}
            src="https://eyesome.netlify.app/static/media/empty-wish.5af0d55ffd0f31b86c32.gif"
            width={mobile ? "300" : "400"}
          />
          <Typography
            variant="h5"
            sx={{
              color: "#d1d5db",
            }}
          >
            Nothing to show here
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#aca6b8",
            }}
            textAlign="center"
          >
            Unlock Your Shopping Desires: Fill Your Empty Wishlist
          </Typography>
        </Stack>
      ) : (
        <Grid container>
          {state?.wishlist?.map((item) => {
            const { id, rating, image, price, brand, name, newPrice } = item;
            return (
              <Grid item key={id} xs={12} sm={12} lg={3}>
                <Card id="card"sx={{
                  display: mobile ? "flex" : "",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: mobile ? "11rem" : "100%",
                  width:'fit-content',
                }}>
                  
                   <Box
                  sx={{
                    backgroundColor: "#ecebe8",
                    height: mobile ? "11rem" : "10rem",
                  }}
                  id="box"
                >
                  <CardMedia
                    component="img"
                    image={image}
                    height={"145"}
                    sx={{
                      backgroundColor: "#ecebe8",
                      width: mobile ? 150 : "100%",
                      paddingBlockStart: mobile ? 3 : "",
                    }}
                  />
                  </Box>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="baseline"
                      spacing={5}
                    >
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="baseline"
                        spacing={0.8}
                      >
                        <Typography variant="body1">{name}</Typography>
                        <Stack direction="row" alignItems="center">
                          <Typography variant="body2">{rating}</Typography>
                          <Rating max={1} value={5} size="small" />
                          <Typography variant="caption1">Rating</Typography>
                        </Stack>
                        <Typography variant="body2">{brand}</Typography>
                      </Stack>
                      <Stack direction="column">
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#dc7f2c",
                          }}
                        >
                          {priceconversion(price)}
                        </Typography>
                        <strike>{priceconversion(newPrice)}</strike>
                      </Stack>
                    </Stack>
                    <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: 5,
                          color: "black",
                          borderColor: "black",
                          outline: "none",
                          fontSize: 10,
                          width: 92,
                        }}
                        size="small"
                        onClick={() => {
                          if (
                            state.cartItems.find((item) => item.name === name)
                          ) {
                            navigate("/paybag");
                          } else {
                            dispatch({ type: "add-to-bag", payload: name });
                          }
                        }}
                      >
                        {isItem_added_to_bag(name)}
                      </Button>
                      <IconButton
                        sx={{ marginLeft: "auto", color: "red" }}
                        onClick={() =>
                          dispatch({
                            type: "remove-from-wishlist",
                            payload: name,
                          })
                        }
                      >
                        <BsFillBookmarkHeartFill />
                      </IconButton>
                    </Stack>
                  </CardContent>
                 
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};
export default WishList;
