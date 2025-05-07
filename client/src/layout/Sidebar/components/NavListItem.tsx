import {useNavigate} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {NavItem} from "../data";

export default function NavListItem({navItem, navUrl, NavIcon}: NavItem) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (navUrl) navigate(navUrl);
  };
  return (
    <ListItem disablePadding onClick={handleClick}>
      <ListItemButton>
        <ListItemIcon>
          <NavIcon />
        </ListItemIcon>
        <ListItemText primary={navItem} />
      </ListItemButton>
    </ListItem>
  );
}
