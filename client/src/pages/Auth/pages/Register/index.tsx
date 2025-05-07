import {Container, TextField} from "@mui/material";
import {Navigate} from "react-router-dom";
import useAuthStore from "../../../../app/store/auth";
import AuthForm from "../../../../shared/components/AuthForm";
import useRegister from "../../services/register";
import useRegisterFormData, {
  RegisterFormData,
} from "../../validation/useRegisterFormData";

export default function Register() {
  // FORM_VALIDATION
  const {
    register: registerV,
    handleSubmit,
    formState: {errors},
  } = useRegisterFormData();

  // HANDLE_REGISTER
  const {mutate, isLoading} = useRegister();
  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  // IF_REGISTER_REDIRECT_TO_HOME
  const {token} = useAuthStore();
  if (token) return <Navigate to="/" />;

  return (
    <Container component={"section"} maxWidth="xs">
      <AuthForm
        isLoading={isLoading}
        formHead="Sign Up"
        handleSubmit={handleSubmit(onSubmit)}
      >
        {/* Form_Input_Username */}
        <TextField
          inputProps={{...registerV("username")}}
          error={!!errors.username}
          helperText={errors.username?.message}
          margin="normal"
          required
          fullWidth
          type="text"
          id="username"
          label="Username"
          name="username"
          autoFocus
        />
        {/* Form_Input_Email */}
        <TextField
          inputProps={{...registerV("email")}}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
          fullWidth
          type="email"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        {/* Form_Input_Password */}
        <TextField
          inputProps={{...registerV("password")}}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
          fullWidth
          type="password"
          id="password"
          label="Password"
          name="password"
        />
      </AuthForm>
    </Container>
  );
}
