import {Box, Button, CircularProgress, TextField} from "@mui/material";
import {Controller} from "react-hook-form";
import Head from "../../../../shared/components/Head";
import useCreateDevice from "../../services/createDevice";
import useEditDeviceFormData, {
  EditDeviceFormData,
} from "../../validation/useEditDeviceFormData";

export default function CreateDevice() {
  // FORM_VALIDATION
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useEditDeviceFormData();

  // HANDLE_CREATE_DEVICE
  const {mutate, isLoading} = useCreateDevice();
  const onSubmit = (data: EditDeviceFormData) => {
    mutate(data);
  };

  return (
    <>
      <Head h="Add New Device" />
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{mt: 1}}
        >
          {/* Form_Input_Name*/}
          <TextField
            inputProps={{...register("name")}}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            fullWidth
            type="text"
            id="name"
            label="Name"
            name="name"
            autoFocus
          />

          {/* Form_Input_Type*/}
          <TextField
            inputProps={{...register("type")}}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            fullWidth
            type="text"
            id="type"
            label="Type"
            name="type"
          />

          {/* Form_Input_DUO_PRICE */}
          <Controller
            control={control}
            name="duoPricePerHour"
            render={({field}) => (
              <TextField
                {...field}
                error={!!errors.duoPricePerHour}
                helperText={errors.duoPricePerHour?.message}
                margin="normal"
                fullWidth
                type="number"
                id="duoPricePerHour"
                label="Duo Price Per Hour"
              />
            )}
          />

          {/* Form_Input_BuyPrice */}
          <Controller
            control={control}
            name="multiPricePerHour"
            render={({field}) => (
              <TextField
                {...field}
                error={!!errors.multiPricePerHour}
                helperText={errors.multiPricePerHour?.message}
                margin="normal"
                fullWidth
                type="number"
                id="multiPricePerHour"
                label="Multi Price Per Hour"
              />
            )}
          />

          {/* Submit_Form_Button */}
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
      </Box>
    </>
  );
}
