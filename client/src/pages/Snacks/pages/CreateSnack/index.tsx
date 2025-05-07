import {Box, Button, CircularProgress, TextField} from "@mui/material";
import {Controller} from "react-hook-form";
import useCreateSnackFormData, {
  CreateSnackFormData,
} from "../../validation/useCreateSnackFormData";
import useCreateSnack from "../../services/createSnack";
import Head from "../../../../shared/components/Head";

export default function CreateSnack() {
  // FORM_VALIDATION
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useCreateSnackFormData();

  // HANDLE_CREATE_SNACK
  const {mutate, isLoading} = useCreateSnack();
  const onSubmit = (data: CreateSnackFormData) => {
    mutate(data);
  };

  return (
    <>
      <Head h="Add New Snack" />
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
            required
          />

          {/* Form_Input_Quantity */}
          <Controller
            control={control}
            name="quantityInStock"
            render={({field}) => (
              <TextField
                {...field}
                error={!!errors.quantityInStock}
                helperText={errors.quantityInStock?.message}
                margin="normal"
                fullWidth
                type="number"
                id="quantityInStock"
                label="Quantity In Stock"
                required
              />
            )}
          />

          {/* Form_Input_BuyPrice */}
          <Controller
            control={control}
            name="buyingPrice"
            render={({field}) => (
              <TextField
                {...field}
                error={!!errors.buyingPrice}
                helperText={errors.buyingPrice?.message}
                margin="normal"
                fullWidth
                type="number"
                id="buyingPrice"
                label="Buying Price"
                required
              />
            )}
          />

          {/* Form_Input_SellPrice */}
          <Controller
            control={control}
            name="sellingPrice"
            render={({field}) => (
              <TextField
                {...field}
                error={!!errors.sellingPrice}
                helperText={errors.sellingPrice?.message}
                margin="normal"
                fullWidth
                type="number"
                id="sellingPrice"
                label="Selling Price"
                required
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
