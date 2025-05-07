import AddIcon from "@mui/icons-material/Add";
import {Alert, Box, Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import GridListSkeleton from "../../shared/components/Loader/GridSkeleton";
import useUserRole from "../../shared/hooks/useUserRole";
import SnackItem from "./components/SnackItem";
import useGetAllSnacks from "./services/getAllSnacks";

export default function Snacks() {
  const navigate = useNavigate();

  const {isOwner} = useUserRole();

  // HANDLE_GET_ALL_SNACKS
  const {data, isLoading, isError, error} = useGetAllSnacks();

  if (isError) {
    return (
      <Alert variant="filled" color="error">
        {error?.message}
      </Alert>
    );
  }

  return (
    <Box component={"section"}>
      {isOwner && (
        <Box textAlign={"end"} mb={2}>
          <Button
            variant="outlined"
            onClick={() => navigate("/snacks/create")}
            startIcon={<AddIcon />}
          >
            Add New
          </Button>
        </Box>
      )}
      <Grid container spacing={2}>
        {isLoading ? (
          <GridListSkeleton numOfItems={6} xs={12} sm={6} lg={4} />
        ) : data.data.docs.length > 0 ? (
          data.data.docs.map((item, idx) => (
            <Grid item xs={12} sm={6} lg={4} key={idx}>
              <SnackItem {...item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Alert variant="outlined" color="warning" severity="info">
              No Snacks Added Yet
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
