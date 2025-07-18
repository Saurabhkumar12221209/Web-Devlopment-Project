import {
  Stack,
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { useContext,  } from "react";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { products } from "../dummy";
import { categories } from "../categories";
import { AppData } from "../App";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link,useNavigate } from "react-router-dom";

const Home = () => {
  const { mobile } = useContext(AppData);
  const navigate=useNavigate();
  return (
    <Container>
      <Stack
        sx={{
          marginBlockStart:mobile?4:10,
        }}
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack>
          <Typography variant={mobile ? "h2" : "h1"}>
            Glasses
            <br />& Lens
          </Typography>
          <Typography
            variant="body1"
            sx={{
              paddingBlockStart: 3,
            }}
          >
            Buy the best high-quality sunglasses from us.
            <br />
            More than 100 types of assortment.
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              paddingBlockStart: 2,
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                color: "#ede2d4",
                backgroundColor: "#111827",
                '&:hover':{
                  backgroundColor:'#ede2d4',
                  color:'#111827'
                }
              }}
              onClick={()=>navigate("/products")}
            >
              Start Shopping
            </Button>
            <Button
              variant="text"
              size="small"
              endIcon={<SouthEastIcon />}
              sx={{
                color: "#0d2a38",
              }}
              onClick={() => {
                const grid = document.getElementById("grid-item");
                grid.lastElementChild.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore More
            </Button>
          </Stack>
        </Stack>
        {!mobile && (
          <Box
            component="img"
            src="https://eyesome.netlify.app/static/media/bannerImg.712fc34e6a2084115f10.png"
            alt=""
            sx={{
              width: 400,
            }}
          />
        )}
      </Stack>
      <Grid
        container
        spacing={mobile ? 1 : 3}
        sx={{
          marginBlockStart: 12,
        }}
        id="grid-item"
      >
        <Grid item xs={6} sm={6} lg={3} sx={{ width: "100%" }}>
          <Typography variant={mobile ? "h6" : "h2"}>
            Trending
            <br /> Products
          </Typography>
        </Grid>
        {products.slice(4, 11).map((product, index) => {
          const { name, price, category, image } = product;
          return (
            <Grid
              item
              key={index}
              xs={6}
              sm={6}
              lg={3}
              component={Link}
              to={`/${category}/${name}`}
              sx={{
                textDecoration: "none",
              }}
            >
              <Paper
                sx={{
                  backgroundColor: "#ecebe8",
                  width: mobile ? 145 : 240,
                  height: mobile ? 160 : 180,
                  padding: mobile ? 1.5 : 2,
                  boderRadius: 1.8,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={mobile ? 2 : ""}
                >
                  <Typography variant="body1">{name}</Typography>
                  <Typography variant="body2">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumSignificantDigits: price.toString().length,
                    }).format(price)}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ textAlign: "end" }}>
                  {category}
                </Typography>
                <Box
                  component="img"
                  alt=""
                  src={image}
                  sx={{
                    width: mobile ? "100%" : 220,
                    display: "block",
                    margin: "auto",
                    aspectRatio: 3 / 2,

                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "0.5s",
                    },
                  }}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Stack
        sx={{
          marginBlockStart: 5,
        }}
      >
        <Typography variant={mobile ? "h6" : "h4"} textAlign="center">
          Categories
        </Typography>
        <Stack
          direction={mobile ? "column" : "row"}
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          sx={{
            marginBlockStart: 2,
          }}
        >
          {categories.map((category) => {
            const { id, categoryName, categoryImg } = category;
            return (
              <Box
                sx={{
                  position: "relative",
                }}
                key={id}
                component={Link}
                to={`/${categoryName}`}
              >
               <Typography
                  variant="h4"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    color: "white",
                    zIndex:1,
                    transform: "translate(-50%,-50%)",
                    background: "transparent",
                  }}
                >
                  {categoryName}
                </Typography>
                <LazyLoadImage
                  alt=""
                  height={250}
                  src={categoryImg}
                  width="100%"
                  style={{
                    borderRadius: "1.5rem",
                  }}
                  placeholderSrc={`https://placehold.co/300x200/808080/808080?text=${categoryName}`}
                 
                />
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
};
export default Home;
