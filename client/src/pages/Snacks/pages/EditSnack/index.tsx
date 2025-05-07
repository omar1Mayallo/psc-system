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
import SnackItem from "../../components/SnackItem";
import useEditSnack from "../../services/editSnack";
import useGetSnack from "../../services/getSnack";
import useEditSnackFormData, {
  EditSnackFormData,
} from "../../validation/useEditSnackFormData";
import useDefaultValues from "./useDefaultValues";

export default function EditSnack() {
  const {snackId} = useParams();
  // HANDLE_GET_ALL_SNACKS
  const {data, isLoading, isError, error} = useGetSnack(snackId as string);

  // INPUTS_DEFAULT_VALUES
  const defaultValues = useDefaultValues(data);

  // FORM_VALIDATION
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useEditSnackFormData();

  // HANDLE_EDIT_SNACK
  const {mutate: editMutate, isLoading: isEditLoading} = useEditSnack(
    snackId as string
  );
  const onSubmit = (data: EditSnackFormData) => {
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
      <Head h="Edit Snack" />
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

              {/* Form_Input_Quantity */}
              <Controller
                control={control}
                name="quantityInStock"
                defaultValue={defaultValues.quantityInStock}
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
                  />
                )}
              />

              {/* Form_Input_BuyPrice */}
              <Controller
                control={control}
                name="buyingPrice"
                defaultValue={defaultValues?.buyingPrice}
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
                  />
                )}
              />

              {/* Form_Input_SellPrice */}
              <Controller
                control={control}
                name="sellingPrice"
                defaultValue={defaultValues?.sellingPrice}
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
              <SnackItem {...data.data.doc} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
