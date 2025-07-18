import { createContext, useReducer } from "react";
import {
  Stack,
  Typography,
  Box,
  AppBar,
  useMediaQuery,
  useTheme,
  IconButton,
  Badge,
  Paper,
  Divider,
  Snackbar,
} from "@mui/material";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Home from "./components/home";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import GlassCategory from "./components/category";
import GlassInfo from "./components/glassinfo";
import WishList from "./components/wishlist";
import Bag from "./components/paybag";
import { products } from "./dummy";
import ClearIcon from "@mui/icons-material/Clear";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SearchIcon from "@mui/icons-material/Search";
import ListItems from "./components/search";
export const AppData = createContext();
function App() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const priceconversion = (pricevalue) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumSignificantDigits: pricevalue?.toString().length,
    }).format(pricevalue);
  };
  const initialstate = {
    wishlist: [],
    bag: [],
    ishide: false,
    filteredItems: [],
    show_drawer: false,
    value: "",
    showalert: false,
    alert_text: "",
    cartItems: [],
    quantity: 1,
    total: 0,
    open_dialog: false,
    isAuthenticated: false,
  };
  const reducer = (state, action) => {
    if (action.type === "add-to-wishlist") {
      return {
        ...state,
        wishlist: [
          ...state.wishlist,
          products.find((el) => el.name === action.payload),
        ],
      };
    }
    if (action.type === "remove-from-wishlist") {
      return {
        ...state,
        wishlist: state.wishlist.filter((el) => el.name !== action.payload),
      };
    }
    if (action.type === "search-items") {
      return {
        ...state,
        ishide: action.payload.length === 0 ? false : true,
        filteredItems: products.filter((el) =>
          el.name
            .toUpperCase()
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        ),
        value: action.payload,
      };
    }
    if (action.type === "open-drawer") {
      return {
        ...state,
        show_drawer: true,
      };
    }
    if (action.type === "close-drawer") {
      return {
        ...state,
        show_drawer: false,
      };
    }
    if (action.type === "close-searchlist-on-select") {
      return {
        ...state,
        value: "",
        ishide: false,
      };
    }
    if (action.type === "show-snackbar") {
      return {
        ...state,
        showalert: true,
        alert_text: "Item added to cart",
      };
    }
    if (action.type === "hide-snackbar") {
      return {
        ...state,
        showalert: true,
        alert_text: "Item removed from cart",
      };
    }
    if (action.type === "close-alert") {
      return {
        ...state,
        showalert: false,
      };
    }
    if (action.type == "add-to-bag") {
      const bagItem = products.find((el) => el.name === action.payload);
      return {
        ...state,
        cartItems: [...state.cartItems, { ...bagItem, quantity: 1 }],
      };
    }
    if (action.type === "clear-cart") {
      return {
        ...state,
        cartItems: [],
      };
    }
    if (action.type === "increment") {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.name === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    if (action.type === "decrement") {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.name === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }
    if (action.type == "remove-item") {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.name !== action.payload
        ),
      };
    }
    if (action.type === "open-dialog") {
      return {
        ...state,
        open_dialog: true,
      };
    }
    if (action.type === "close-dialog") {
      return {
        ...state,
        open_dialog: false,
      };
    }
    if (action.type === "mobile-search-list") {
      return {
        ...state,
        filteredItems: products.filter((el) =>
          el.name
            .toUpperCase()
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        ),
        value: action.payload,
      };
    }
    if (action.type === "logged-in") {
      return {
        ...state,
        isAuthenticated: true,
      };
    } else {
      return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialstate);
  const clear_button = (
    <IconButton
      onClick={() => dispatch({ type: "close-alert" })}
      color="inherit"
    >
      <ClearIcon />
    </IconButton>
  );
  const snackbar_item = (
    <Snackbar
      message={state.alert_text}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={state.showalert}
      onClose={() => dispatch({ type: "close-alert" })}
      action={clear_button}
      autoHideDuration={1000}
    />
  );
  const add_to_wishlist = (itemname) => {
    if (state.wishlist.find((el) => el.name === itemname)) {
      dispatch({ type: "remove-from-wishlist", payload: itemname });
      dispatch({ type: "hide-snackbar" });
    } else {
      dispatch({ type: "add-to-wishlist", payload: itemname });
      dispatch({ type: "show-snackbar" });
    }
  };
  const isItem_added_to_bag = (itemname) =>
    state.cartItems.find((el) => el.name === itemname)
      ? "Go to bag"
      : "Add to bag";
  return (
    <HashRouter>
      <AppBar sx={{ p: 1, boxShadow: 0 }} position="static" color="inherit">
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={5}
        >
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Typography
              variant={mobile ? "h6" : "h5"}
              sx={{
                color: "#252525",
                fontFamily: "Snell Roundhand, cursive",
                textDecoration: "none",
              }}
              component={Link}
              to="/"
            >
              EyeShop
            </Typography>
          </Stack>

          <Stack spacing={1.2}>
            {mobile ? (
              ""
            ) : (
              <Box
                component="input"
                type="search"
                sx={{
                  width: mobile ? "100%" : 400,
                  height: 38,
                  borderRadius: 4,
                  outline: "none",
                  border: "none",
                  backgroundColor: "#e8e7e5",
                  paddingLeft: 2,
                }}
                placeholder="Search glasses"
                onChange={(e) => {
                  dispatch({ type: "search-items", payload: e.target.value });
                }}
                value={state.value}
              ></Box>
            )}
            {state.ishide && (
              <Paper
                id="paper"
                sx={{
                  position: "absolute",
                  width: mobile ? 350 : 400,
                  maxHeight: 180,
                  top: mobile ? 120 : 45,
                  overflowY: "scroll",
                }}
              >
                {state.filteredItems.length > 0 ? (
                  state?.filteredItems?.map((filteredItem, index) => {
                    const { category, name, image, price } = filteredItem;
                    return (
                      <Box
                        key={index}
                        onClick={() =>
                          dispatch({ type: "close-searchlist-on-select" })
                        }
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: 1,
                            textDecoration: "none",
                          }}
                          component={Link}
                          to={`/${category}/${name}`}
                          id="box"
                        >
                          <LazyLoadImage
                            alt=""
                            height={"auto"}
                            src={image}
                            width="60"
                            style={{
                              borderRadius: 1.2,
                            }}
                          />
                          <Typography variant="body1" sx={{ color: "grey" }}>
                            {name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#252525" }}>
                            {priceconversion(price)}
                          </Typography>
                        </Box>
                        <Divider />
                      </Box>
                    );
                  })
                ) : (
                  <Typography
                    variant="body1"
                    textAlign="center"
                    sx={{
                      color: "burlywood",
                      marginBlockStart: 1,
                    }}
                  >
                    No items found
                  </Typography>
                )}
              </Paper>
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1.2}>
            {mobile ? (
              <IconButton onClick={() => dispatch({ type: "open-dialog" })}>
                <SearchIcon />
              </IconButton>
            ) : (
              ""
            )}
            <IconButton
              size="small"
              sx={{
                backgroundColor: "#e5e7eb",
                p: 1.2,
                "&:hover": {
                  color: "white",
                  backgroundColor: "#a16207",
                },
              }}
              component={Link}
              to="wishlist"
            >
              <Badge
                badgeContent={state.wishlist.length}
                invisible={state.wishlist.length === 0 ? true : false}
                color="error"
              >
                <BsFillBookmarkHeartFill />
              </Badge>
            </IconButton>

            <IconButton
              size="small"
              sx={{
                backgroundColor: "#eab308",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#a16207",
                },
              }}
              component={Link}
              to="paybag"
            >
              <Badge
                badgeContent={state.cartItems.length}
                invisible={state.cartItems.length === 0 ? true : false}
                color="error"
              >
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Stack>
        </Stack>
      </AppBar>

      <AppData.Provider
        value={{
          mobile,
          snackbar_item,
          priceconversion,
          state,
          dispatch,
          add_to_wishlist,
          isItem_added_to_bag,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="paybag" element={<Bag />} />
          <Route path=":glasscategory" element={<GlassCategory />} />
          <Route path=":glasscategory/:eachitem" element={<GlassInfo />} />
        </Routes>
        <ListItems />
      </AppData.Provider>
    </HashRouter>
  );
}
export default App;
