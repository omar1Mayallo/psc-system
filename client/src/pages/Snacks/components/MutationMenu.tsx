import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import useMenuHandler from "../hooks/useMenuHandler";
import useDeleteSnack from "../services/deleteSnack";
import {useNavigate} from "react-router-dom";

export default function MutationMenu({id}: {id: string}) {
  const theme = useTheme();

  // TOGGLE_MENU_HANDLER
  const {anchorEl, handleOpenMenu, handleCloseMenu} = useMenuHandler();

  // DELETE_SNACK_HANDLER
  const {mutate, isLoading} = useDeleteSnack();

  const navigate = useNavigate();

  return (
    <>
      <Box>
        {isLoading ? (
          <CircularProgress size={25} />
        ) : (
          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenMenu}
            color="inherit"
          >
            <MoreVertIcon />
          </IconButton>
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem
            onClick={() => navigate(`/snacks/${id}/edit`)}
            disableRipple
          >
            <EditIcon sx={{mr: 1.5}} />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              mutate(id);
              handleCloseMenu();
            }}
            disableRipple
            sx={{color: theme.palette.error.main}}
          >
            <DeleteIcon sx={{mr: 1.5}} />
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
