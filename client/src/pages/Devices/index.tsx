import AddIcon from "@mui/icons-material/Add";
import {Alert, Box, Button, CircularProgress, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useUserRole from "../../shared/hooks/useUserRole";
import useGetAllDevices from "./services/getAllDevices";
import GridListSkeleton from "../../shared/components/Loader/GridSkeleton";
import DeviceItem from "./components/DeviceItem";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import useResetAllDevices from "./services/resetAllDevices";

export default function Devices() {
  const navigate = useNavigate();
  const {isOwner, isUser} = useUserRole();

  // HANDLE_GET_ALL_DEVICES
  const {data, isLoading, isError, error} = useGetAllDevices();

  // RESET_ALL_DEVICES
  const {mutate, isLoading: isResetAllLoading} = useResetAllDevices();

  if (isError) {
    return (
      <Alert variant="filled" color="error">
        {error?.message}
      </Alert>
    );
  }

  return (
    <Box component={"section"}>
      {/* CREATE_DEVICE */}

      <Box textAlign={"end"} mb={2}>
        {isUser ||
          (data && data.data.docs.length > 0 && (
            <>
              <Button
                onClick={() => mutate()}
                variant="outlined"
                color="secondary"
                disabled={isResetAllLoading}
                startIcon={
                  isResetAllLoading ? (
                    <CircularProgress size={15} color="inherit" />
                  ) : (
                    <RestartAltIcon color="inherit" />
                  )
                }
              >
                {isResetAllLoading ? "Loading" : "Reset All"}
              </Button>{" "}
            </>
          ))}

        {isOwner && (
          <Button
            variant="outlined"
            onClick={() => navigate("/devices/create")}
            startIcon={<AddIcon />}
          >
            Add New
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        {isLoading ? (
          <GridListSkeleton numOfItems={6} xs={12} sm={6} lg={4} />
        ) : data.data.docs.length > 0 ? (
          data.data.docs.map((item, idx) => (
            <Grid item xs={12} md={6} lg={4} key={idx}>
              <DeviceItem item={item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Alert variant="outlined" color="warning" severity="info">
              No Devices Added Yet
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
