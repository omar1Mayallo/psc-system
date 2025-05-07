import {Container, TextField} from "@mui/material";
import {Navigate} from "react-router-dom";
import useAuthStore from "../../../../app/store/auth";
import AuthForm from "../../../../shared/components/AuthForm";
import useLogin from "../../services/login";
import useLoginFormData, {
  LoginFormData,
} from "../../validation/useLoginFormData";

export default function Login() {
  // FORM_VALIDATION
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useLoginFormData();

  // HANDLE_LOGIN
  const {mutate, isLoading} = useLogin();
  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  // IF_LOGGED_IN_REDIRECT_TO_HOME
  const {token} = useAuthStore();
  if (token) return <Navigate to="/" />;

  return (
    <Container component={"section"} maxWidth="xs">
      <AuthForm
        isLoading={isLoading}
        formHead="Sign In"
        handleSubmit={handleSubmit(onSubmit)}
      >
        {/* Form_Input_Email */}
        <TextField
          inputProps={{...register("email")}}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
          required
          fullWidth
          type="email"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        {/* Form_Input_Password */}
        <TextField
          inputProps={{...register("password")}}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
          required
          fullWidth
          type="password"
          id="password"
          name="password"
          label="Password"
        />
      </AuthForm>
    </Container>
  );
}
