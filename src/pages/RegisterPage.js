import React, { useState } from "react";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Container } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAuth from "../hooks/useAuth";

const loginSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), "Password must match"]),
});
const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmiting },
  } = methods;

  const onSubmit = async (data) => {
    let { name, email, password } = data;
   
    try {
      await auth.register({ name, email, password }, () => {
        navigate("/login", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responeError", error);
    }
  };
  
  return (
    <Container maxWidth="xs">
      <Card>
        <CardContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {!!errors.responeError && (
                <Alert severity="error"> {errors.responeError.message}</Alert>
              )}
              <Alert severity="info">
                Already have an account? {""}
                <Link variant="subtitle2" component={RouterLink} to="/login">
                  Sign in!
                </Link>
              </Alert>
              <FTextField name="name" label="Full name" />
              <FTextField name="email" label="Email address" />
              <FTextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        egde="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FTextField
                name="confirmPassword"
                label="Confirm password"
                type={confirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setConfirmPassword(!confirmPassword)}
                        egde="end"
                      >
                        {confirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmiting}
              >
                Register
              </LoadingButton>
            </Stack>
          </FormProvider>
        </CardContent>
      </Card>
    </Container>
  );
}

export default RegisterPage;
