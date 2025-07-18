import {
  Button,
  Stack,
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { AppData } from "../App";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const Bag = () => {
  const { state, mobile, dispatch, priceconversion } = useContext(AppData);
  const [total, setTotal] = useState(null);
  const navigate = useNavigate();
  

  
  useEffect(() => {
    const prices = state.cartItems.map((prod) => prod.price);
    const quantities = state.cartItems.map((prod) => prod.quantity);
    
    // Calculate the total value by summing the product of price and quantity for each item
    const totalValue = prices.reduce((acc, price, index) => {
      return acc + price * quantities[index];
    }, 0);
   
    setTotal(totalValue);
  }, [state.cartItems, state.quantity]);
  

  const pay_money = () => {
    const paymentMethods = [
      {
        supportedMethods: 'https://bobbucks.dev/pay',
        data: {
          supportedNetworks: ['visa', 'mastercard', 'discover'],
          supportedTypes: ['credit'],
        },
      },
    ];
    const paymentDetails = {
      total: {
        label: 'Total Amount',
        amount: {
          currency: 'INR',
          value: total,
        },
      },
      displayItems: [
        {
          label: '15% Discount',
          amount: {
            currency: 'INR',
            value: 25,
          },
        },
        {
          label: 'Tax',
          amount: {
            currency: 'INR',
            value: 0.79,
          },
        },
      ],
    };
    const options = {
      requestPayerName: true,
      requestPayerPhone: true,
      requestPayerEmail: true,
    };
    const paymentRequest = new PaymentRequest(
      paymentMethods,
      paymentDetails,
      options
    );

    paymentRequest
      .show()
      .then((paymentResponse) => {
        // close the payment UI
        paymentResponse.complete().then(() => {
        });
      })
      .catch((err) => {
        // user closed the UI or the API threw an error
        console.log('Error:', err.message);
      });
  };
  return (
    <Container
      sx={{
        marginBlockStart: 8,
      }}
    >
      {state.cartItems.length === 0 ? (
        <Stack
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          spacing={1.5}
          sx={{
            marginBlockStart: mobile ? "50%" : "15%",
          }}
        >
          <LazyLoadImage
            alt=""
            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSowmOK95tjuDzp2yt8FhmJD2gCeQRyTW9YaTZ6bHVfjuEED9hS"
            style={{
              transform: "rotate(-15deg)",
              mixBlendMode: "color-burn",
              width: "10rem",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Josefin Sans, sans-serif",
            }}
          >
            Hey! it feels so light
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Josefin Sans, sans-serif",
              color: "#a6b6ce",
            }}
          >{`There's nothing in your bag. Let's add some items.`}</Typography>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 8,
            }}
            onClick={() => {
              document.startViewTransition(() => navigate("/"));
            }}
          >
            Explore now
          </Button>
        </Stack>
      ) : (
        <>
          <Stack
            direction="column"
            spacing={1.8}
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              marginBlockEnd: 8,
            }}
          >
            {state.cartItems.map((item, index) => {
              const { image, price, name, quantity } = item;
              return (
                <List
                  key={index}
                  sx={{
                    width: mobile ? "100%" : 600,
                  }}
                >
                  <ListItem
                    secondaryAction={
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            dispatch({ type: "increment", payload: name })
                          }
                        >
                          <AddIcon />
                        </IconButton>
                        <Box component="div">{quantity}</Box>
                        <IconButton
                          size="small"
                          onClick={() =>
                            dispatch({ type: "decrement", payload: name })
                          }
                          disabled={quantity<2?true:false}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={image}
                        alt=""
                        sx={{
                          width: 92,
                          margin: 0.8,
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        paddingInlineStart: mobile ? 3 : 5,
                      }}
                      primary={name}
                      secondary={
                        <>
                          <Typography variant="body2">
                            {priceconversion(price)}
                          </Typography>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => {
                              dispatch({ type: "remove-item", payload: name });
                            }}
                          >
                            Remove item
                          </Button>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </List>
              );
            })}
          </Stack>
          <Box
            sx={{
              width: "100%",
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "whitesmoke",
              borderTop: "2px solid charcoal",
              padding: 2,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              spacing={5}
            >
              <Typography variant="body1">
                Total:{priceconversion(total)}
              </Typography>
              <Stack direction="row" spacing={1.2} sx={{
                pr:2
              }}>
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    backgroundColor: "#AEB4A9",
                    color: "black",
                  }}
                  onClick={() => dispatch({ type: "clear-cart" })}
                >
                  clear cart
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#3CBBB1",
                    "&:hover": {
                      backgroundColor: "#3CBBB1",
                    },
                   
                  }}
                  onClick={pay_money}
                >
                  Pay money
                </Button>
              </Stack>
            </Stack>
          </Box>
        </>
      )}
    </Container>
  );
};
export default Bag;
