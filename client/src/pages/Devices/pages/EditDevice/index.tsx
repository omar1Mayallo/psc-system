import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import {Controller} from "react-hook-form";
import {useParams} from "react-router-dom";
import Head from "../../../../shared/components/Head";
import {CardItemSkeleton} from "../../../../shared/components/Loader/GridSkeleton";
import SkeletonForm from "../../../../shared/components/Loader/SkeletonForm";
import DeviceItem from "../../components/DeviceItem";
import useEditDevice from "../../services/editDevice";
import useGetDevice from "../../services/getDevice";
import useEditDeviceFormData, {
  EditDeviceFormData,
} from "../../validation/useEditDeviceFormData";
import useDefaultValues from "./useDefaultValues";

export default function EditDevice() {
  const {deviceId} = useParams();
  // HANDLE_GET_ALL_SNACKS
  const {data, isLoading, isError, error} = useGetDevice(deviceId as string);

  // INPUTS_DEFAULT_VALUES
  const defaultValues = useDefaultValues(data);

  // FORM_VALIDATION
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useEditDeviceFormData();

  // HANDLE_EDIT_SNACK
  const {mutate: editMutate, isLoading: isEditLoading} = useEditDevice(
    deviceId as string
  );
  const onSubmit = (data: EditDeviceFormData) => {
    editMutate(data);
  };

  if (isError) {
    return (
      <Alert variant="filled" color="error">
        {error?.message}
      </Alert>
    );
  }

  return (
    <Box>
      <Head h="Edit Device" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8}>
          {!defaultValues?.name ? (
            <SkeletonForm />
          ) : (
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
                defaultValue={defaultValues?.name}
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
                defaultValue={defaultValues?.type}
              />

              {/* Form_Input_DUO_PRICE */}
              <Controller
                control={control}
                name="duoPricePerHour"
                defaultValue={defaultValues.duoPricePerHour}
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
                defaultValue={defaultValues?.multiPricePerHour}
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
                disabled={isEditLoading}
                startIcon={
                  isEditLoading && (
                    <CircularProgress size={15} color="inherit" />
                  )
                }
              >
                <span>{isEditLoading ? "Saving" : "Save Changes"}</span>
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            {isLoading ? (
              <CardItemSkeleton />
            ) : (
              <DeviceItem item={data.data.doc} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
