import { useParams, useNavigate } from "react-router-dom";
import { products } from "../dummy";
import { useState, useEffect, useContext } from "react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import {
  Container,
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Grid,
  Rating,
  IconButton,
  Drawer,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Slider,
} from "@mui/material";
import { AppData } from "../App";
import FilterListIcon from "@mui/icons-material/FilterList";
const GlassCategory = () => {
  const param = useParams();
  const navigate = useNavigate();
  const {
    mobile,
    priceconversion,
    isItem_added_to_bag,
    snackbar_item,
    dispatch,
    state,
    add_to_wishlist,
  } = useContext(AppData);
  const [glasstype, setGlasstype] = useState([]);
  useEffect(() => {
    if (param.glasscategory === "products") {
      setGlasstype(products);
    } else {
      const glasses = products?.filter(
        (item) =>
          item.category.toUpperCase() === param.glasscategory.toUpperCase()
      );
      setGlasstype(glasses);
    }
  }, [param.glasscategory]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [ischeckedindex, setIscheckedindex] = useState(null);
  useEffect(() => {
    const select_element = document.getElementById("price-filter");
    select_element.onchange = (e) => {
      document.startViewTransition(() => {
        select_element.firstChild.disabled = true;
        if (e.target.value === "High to Low") {
          const ascending = glasstype.toSorted((a, b) => {
            return b.price - a.price;
          });
          setGlasstype(ascending);
        }
        if (e.target.value === "Low to High") {
          const descending = glasstype.toSorted((a, b) => {
            return a.price - b.price;
          });
          setGlasstype(descending);
        }
      });
    };
  }, [glasstype]);
  const btns = ["All", "Men", "Women", "Unisex"];
  const categories = ["Vision", "Sunglasses", "Sports"];
  const ratingtypes = [
    "1 Stars & above",
    "2 Stars & above",
    "3 Stars & above",
    "4 Stars & above",
  ];
  const result = Object.groupBy(products, ({ price }) => price);
  const args = Object.keys(result);
  const minmax = args.map((el) => parseInt(el));
  const [val, setVal] = useState(minmax.at(-2));
  return (
    <Container sx={{ marginBlockStart: mobile ? 8 : 12 }}>
      <Box
        component="img"
        alt=""
        loading="lazy"
        src="https://eyesome.netlify.app/static/media/bannerHero.b913ee7a0754b4966295.jpg"
        sx={{
          width: "100%",
          height: mobile ? 220 : 350,
          borderRadius: 0.8,
        }}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBlockStart: 2, gap: mobile ? 2 : "" }}
      >
        <Typography variant={mobile ? "body1" : "h6"}>
          Glasses for you!
        </Typography>
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Box
            component="select"
            name="price-filter"
            id="price-filter"
            sx={{
              border: "none",
              boxShadow: 4,
              padding: 0.5,
              borderRadius: 0.8,
            }}
          >
            <Box component="option" value="Sort by price">
              Sort by price
            </Box>
            <Box component="option" value="High to Low">
              High to Low
            </Box>
            <Box component="option" value="Low to High">
              Low to high
            </Box>
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={{
              color: "black",
              backgroundColor: "white",
              height: 25,
              "&:hover": {
                color: "white",
                backgroundColor: "black",
              },
            }}
            startIcon={<FilterListIcon />}
            onClick={() => dispatch({ type: "open-drawer" })}
          >
            filters
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={2} sx={{ marginBlockStart: 4 }}>
        {glasstype.map((item, index) => {
          const { id, name, brand, price, newPrice, rating, image } = item;
          return (
            <Grid item key={id} xs={12} sm={6} lg={3}>
              <Card
                sx={{
                  display: mobile ? "flex" : "",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: mobile ? "11rem" : "100%",
                  "&:hover": {
                    boxShadow: 4,
                  },
                 
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#ecebe8",
                    height: mobile ? "11rem" : "10rem",
                    p: mobile ? 1 : "",
                  }}
                  id="box"
                  onClick={() => {
                    document.startViewTransition(() => {
                      navigate(`/${param.glasscategory}/${name}`);
                    });
                  }}
                >
                  <CardMedia
                    component="img"
                    height={"145"}
                    image={image}
                    sx={{
                      width: mobile ? 150 : "100%",
                      paddingBlockStart: mobile ? 3 : "",
                      backgroundColor: "#ecebe8",
                    }}
                  />
                </Box>
                <CardContent sx={{ flex: mobile ? 1 : "" }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="baseline"
                    spacing={mobile ? 3 : ""}
                  >
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="baseline"
                    >
                      <Typography variant="body1">{name}</Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={0.2}
                      >
                        <Typography variant="body2">{rating}</Typography>
                        <Rating readOnly max={1} value={rating} size="small" />
                      </Stack>
                      <Typography variant="body2">{brand}</Typography>
                    </Stack>
                    <Stack direction="column" alignItems="baseline">
                      <Typography variant="body2" sx={{ color: "#dc7f2c" }}>
                        {priceconversion(price)}
                      </Typography>
                      <strike>{newPrice}</strike>
                    </Stack>
                  </Stack>
                  <Divider sx={{ marginBlockStart: 1 }} />

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      marginBlockStart: 2,
                    }}
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
                          window.localStorage.setItem(
                            "bag",
                            JSON.stringify(state.isItem_added_to_bag)
                          );
                        }
                      }}
                    >
                      {isItem_added_to_bag(name)}
                    </Button>
                    <IconButton
                      sx={{
                        marginLeft: "auto",
                        color: state.wishlist.find(
                          (prodname) => prodname.name === name
                        )
                          ? "red"
                          : "",
                      }}
                      key={index}
                      onClick={() => add_to_wishlist(name)}
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
      <Drawer
        open={state.show_drawer}
        onClose={() => dispatch({ type: "close-drawer" })}
      >
        <Box
          sx={{
            p: 1.8,
            width: 200,
          }}
          component="form"
        >
          <Typography variant="h5">Filter products</Typography>
          <Box
            component="input"
            type="reset"
            value="clear"
            onClick={() => {
              setIscheckedindex(null);
              setSelectedIndex(null);
              setGlasstype(() =>
                param.glasscategory === "products"
                  ? products
                  : products?.filter(
                      (item) =>
                        item.category.toUpperCase() ===
                        param.glasscategory.toUpperCase()
                    )
              );
              dispatch({ type: "close-drawer" });
            }}
            sx={{
              border: "none",
              backgroundColor: "#c9c9c7",
              padding: 0.5,
              width: 54,
              marginTop: 2,
              borderRadius: 0.8,
              color: "#252525",
              fontWeight: 700,
            }}
          ></Box>
          <Typography
            variant="h6"
            textAlign="start"
            sx={{
              marginTop: 2,
              pb: 1,
            }}
          >
            Gender
          </Typography>
          <Grid container rowSpacing={1.2}>
            {Array.from(btns, (btn, index) => {
              return (
                <Grid item key={index} xs={6}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#c9c9c7",
                      color: "#252525",
                      fontWeight: 600,
                      height: 22,
                      width: 25,
                      padding: 1.8,
                      fontFamily: "Helvetica, sans-serif",
                      "&:hover,&:focus": {
                        backgroundColor: "#252525",
                        color: "white",
                      },
                    }}
                    onClick={(e) => {
                      if (e.currentTarget.textContent === "All") {
                        setGlasstype(products);
                      } else {
                        const gender_glasses = products.filter(
                          (val) => val.gender === e.currentTarget.textContent
                        );
                        setGlasstype(gender_glasses);
                      }
                      dispatch({ type: "close-drawer" });
                    }}
                  >
                    {btn}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <Typography
            variant="h6"
            sx={{
              marginTop: 2,
              pb: 1,
            }}
          >
            Price range
          </Typography>
          <Slider
            size="medium"
            track="normal"
            color="info"
            value={val}
            max={Math.max(...minmax)}
            getAriaValueText={(text) => text}
            min={Math.min(...minmax)}
            valueLabelDisplay={true}
            valueLabelFormat={(number) => priceconversion(number)}
            sx={{
              color: "black",
              width: 180,
              margin: 0.5,
            }}
            onChange={(e) => {
              const prods = products.filter((el) => el.price >= e.target.value);
              setVal(e.target.value);
              setGlasstype(prods);
            }}
          />
          <Typography
            variant="h6"
            textAlign="start"
            sx={{
              marginTop: 2,
              pb: 1,
            }}
          >
            Categories
          </Typography>
          {Array.from(categories, (category, index) => {
            return (
              <Stack key={index} direction="row" alignItems="center">
                <Checkbox
                  size="small"
                  value={category}
                  onChange={(e) => {
                    const brand_name = products.filter(
                      (val) => val.category === e.currentTarget.value
                    );
                    setGlasstype(brand_name);
                    setIscheckedindex(index);
                    dispatch({ type: "close-drawer" });
                  }}
                  checked={ischeckedindex === index ? true : false}
                  sx={{
                    "&.Mui-checked": {
                      color: "#252525",
                    },
                  }}
                />
                <Typography variant="body1">{category}</Typography>
              </Stack>
            );
          })}
          <Typography
            variant="h6"
            sx={{
              marginTop: 2,
              pb: 1,
            }}
          >
            Rating
          </Typography>
          <RadioGroup
            onChange={(e) => {
              const ratedprod = products.filter(
                (el) => el.rating >= parseInt(e.currentTarget.value)
              );
              setGlasstype(ratedprod);
              dispatch({ type: "close-drawer" });
            }}
          >
            {Array.from(ratingtypes, (ratingtype, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={ratingtype}
                  control={
                    <Radio
                      size="small"
                      label={ratingtype}
                      checked={selectedIndex === index ? true : false}
                      onChange={() => setSelectedIndex(index)}
                      sx={{
                        "&.Mui-checked": {
                          color: "#252525",
                        },
                      }}
                    />
                  }
                  label={ratingtype}
                />
              );
            })}
          </RadioGroup>
        </Box>
      </Drawer>
      {snackbar_item}
    </Container>
  );
};
export default GlassCategory;
