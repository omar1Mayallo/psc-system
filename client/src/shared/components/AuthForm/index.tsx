import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import {ReactNode} from "react";
import {Link as RouterLink} from "react-router-dom";

interface Props {
  isLoading: boolean;
  children: ReactNode;
  handleSubmit: () => void;
  formHead: "Sign In" | "Sign Up";
}

export default function AuthForm({
  isLoading,
  handleSubmit,
  formHead,
  children,
}: Props) {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Form_Header */}
      <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {formHead}
      </Typography>

      {/* Form_Body */}
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
        {/* INPUTS */}
        {children}

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
          <span>{isLoading ? "Loading" : formHead}</span>
        </Button>

        {/* Form_Footer */}
        {formHead === "Sign In" ? (
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{textAlign: "center"}}>
            <Link component={RouterLink} to="/login" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}
