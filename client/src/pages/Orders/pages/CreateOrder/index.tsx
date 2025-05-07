import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Stack,
} from "@mui/material";
import {Controller} from "react-hook-form";
import Head from "../../../../shared/components/Head";
import useGetAllDevices from "../../../Devices/services/getAllDevices";
import useGetAllSnacks from "../../../Snacks/services/getAllSnacks";
import useCreateOrderFormData, {
  CreateOrderFormData,
} from "../../validation/useCreateOrderFormData";
import useCreateOrder from "../../services/createOrder";

export default function CreateOrder() {
  const {
    data: devicesData,
    isLoading: devicesIsLoading,
    error: devicesError,
  } = useGetAllDevices();

  const {
    data: snacksData,
    isLoading: snacksIsLoading,
    error: snacksError,
  } = useGetAllSnacks();

  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useCreateOrderFormData();

  const {mutate, isLoading} = useCreateOrder();
  const onSubmit = (data: CreateOrderFormData) => {
    mutate(data);
  };

  return (
    <Box component={"section"}>
      <Head h="Create Order" />
      <Stack>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("snackId")}
            error={!!errors.snackId}
            helperText={errors.snackId?.message}
            select
            fullWidth
            required
            margin="normal"
            name="snackId"
            id="snackId"
            label="Snack"
          >
            {snacksIsLoading ? (
              <Box display={"flex"} justifyContent={"center"}>
                <CircularProgress size={30} />
              </Box>
            ) : snacksError ? (
              <Box p={1}>
                <Alert variant="outlined" color="error">
                  {snacksError.message}
                </Alert>
              </Box>
            ) : (
              snacksData.data.docs.map((snack) => (
                <MenuItem key={snack._id} value={snack._id}>
                  {snack.name}
                </MenuItem>
              ))
            )}
          </TextField>

          {/* QTY */}
          <Controller
            control={control}
            name="quantity"
            render={({field}) => (
              <TextField
                {...field}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                required
                margin="normal"
                fullWidth
                type="number"
                id="quantity"
                label="Quantity"
              />
            )}
          />

          {/* DEVICE */}
          <TextField
            {...register("deviceId")}
            error={!!errors.deviceId}
            helperText={errors.deviceId?.message}
            select
            margin="normal"
            fullWidth
            name="deviceId"
            id="deviceId"
            label="Device"
            defaultValue={undefined}
          >
            <MenuItem value={undefined}>None</MenuItem>
            {devicesIsLoading ? (
              <Box display={"flex"} justifyContent={"center"}>
                <CircularProgress size={30} />
              </Box>
            ) : devicesError ? (
              <Box p={1}>
                <Alert variant="outlined" color="error">
                  {devicesError.message}
                </Alert>
              </Box>
            ) : (
              devicesData.data.docs.map((device) => (
                <MenuItem key={device._id} value={device._id}>
                  {device.name}
                </MenuItem>
              ))
            )}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            sx={{mt: 3, mb: 2}}
            fullWidth
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress size={15} color="inherit" />
            }
          >
            <span>{isLoading ? "Creating" : "Create"}</span>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
