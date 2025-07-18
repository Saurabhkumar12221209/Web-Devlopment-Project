import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Avatar,
  Divider,
  Stack,
  List,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { useContext } from "react";
import { AppData } from "../App";
import {useNavigate} from "react-router-dom";
const ListItems = () => {
  const { state, dispatch, priceconversion } = useContext(AppData);
  const navigate=useNavigate();
  return (
    <Dialog
      fullScreen
      open={state.open_dialog}
      onClose={() => dispatch({ type: "close-dialog" })}
    >
      <DialogContent>
        <TextField
          size="small"
          type="search"
          placeholder="search item..."
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={() => dispatch({ type: "close-dialog" })}>
                  <WestIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={state?.value}
          onChange={(e) => {
            dispatch({ type: "mobile-search-list", payload: e.target.value });
            console.log(state.filteredItems);
          }}
        />
        <Stack direction="column" justifyContent="center" alignItems="center">
          {state.filteredItems.map((item, index) => {
            const { name, image, price,category } = item;
            return (
              <List
                key={index}
                sx={{
                  width: "100%",
                }}
                onClick={()=>{
                  document.startViewTransition(()=>{
                    navigate(`/${category}/${name}`)
                  })
                  dispatch({type:'close-dialog'})
                }}
              >
                <ListItem
                  secondaryAction={
                    <Typography variant="body1">
                      {priceconversion(price)}
                    </Typography>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      src={image}
                      alt=""
                      sx={{
                        width: "100%",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      paddingInlineStart: 2,
                    }}
                  >
                    <Typography variant="body1">{name}</Typography>
                  </ListItemText>
                </ListItem>
                <Divider />
              </List>
            );
          })}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default ListItems;
