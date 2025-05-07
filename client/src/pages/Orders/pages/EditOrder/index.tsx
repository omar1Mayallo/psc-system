import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import {Controller} from "react-hook-form";
import {useParams} from "react-router-dom";
import Head from "../../../../shared/components/Head";
import {CardItemSkeleton} from "../../../../shared/components/Loader/GridSkeleton";
import SkeletonForm from "../../../../shared/components/Loader/SkeletonForm";
import useGetAllSnacks from "../../../Snacks/services/getAllSnacks";
import OrderCard from "../../components/OrderCard";
import useAddSnackToOrder from "../../services/addSnackToOrder";
import useGetOrder from "../../services/getOrder";
import useCreateOrderFormData, {
  CreateOrderFormData,
} from "../../validation/useCreateOrderFormData";

export default function EditOrder() {
  const {orderId} = useParams();
  // HANDLE_GET_ORDER
  const {data, isLoading, isError, error} = useGetOrder(orderId as string);

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

  // HANDLE_EDIT_ORDER
  const {mutate: editMutate, isLoading: isEditLoading} = useAddSnackToOrder(
    orderId as string
  );
  const onSubmit = (data: CreateOrderFormData) => {
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
      <Head h="Add Snack To Order" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8}>
          {isLoading ? (
            <SkeletonForm />
          ) : (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{mt: 1}}
            >
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
              <OrderCard item={data.data.doc} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
