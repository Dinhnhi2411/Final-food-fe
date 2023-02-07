import React, { useEffect, useState } from "react";
import { FCheckbox, FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { Container } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Card, CardContent, Divider, IconButton, InputAdornment, Link, Stack, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAuth from "../hooks/useAuth";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin, useGoogleLogin,  } from "react-google-login";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from "../app/config";
import {gapi} from "gapi-script";
import axios from "axios";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  const from = location.state?.from?.pathname || "/";
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
    
    let { email, password } = data;
  
    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responeError", error);
    }
   
  };


//   FB.login(function(response) {
//   if (response.status === 'connected') {
//     // Logged into your webpage and Facebook.
//   } else {
//     // The person is not logged into your webpage or we are unable to tell. 
//   }
// });


useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: GOOGLE_CLIENT_ID,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });


  const loginWithFacebook = async (response) => {
    await auth.loginFacebook(response, () => {
      navigate(from, { replace: true });
    });
  };


   const loginWithGoogle = async (response) => {
    await auth.loginGoogle(response, () => {
      navigate(from, { replace: true });
    });
   
  };



  return (
    <Container maxWidth="xs">
    <Card  position="relative">
      <CardContent>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responeError && (
            <Alert severity="error"> {errors.responeError.message}</Alert>
          )}
          <Alert severity="info">
            Don't have account? {""}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Get start!
            </Link>
          </Alert>

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
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FCheckbox name="remember" label="Remember me" />
          <Link component={RouterLink} variant="subtitle2" to="/">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmiting}
          
        >
          Login
        </LoadingButton>
        <Divider textAlign="center" sx={{ m: 2 }}/>
        <Typography
        sx={{
          mt:3,
          mb:3,
          display: "flex",
          justifyContent:"center",
          // color:"primary.contrastText",
         
        }}
        >
          You can login with 
        </Typography>

       <Stack display="flex" flexDirection="row">
          <FacebookLogin
            appId={FACEBOOK_APP_ID}
            callback={loginWithFacebook}
            onFailure={(err) => {
              console.log("FB LOGIN ERROR:", err);
            }}
            render={(renderProps) => (
              <LoadingButton
                fullWidth
                size="large"
                variant="contained"
                sx={{ backgroundColor: "#4267B2", fontSize: "1.2rem" }}
                onClick={renderProps.onClick}
              >
                <FaFacebookF />
              </LoadingButton>
            )}
          />

          <Box sx={{ mx: 1 }} />

          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={loginWithGoogle}
            onFailure={(err) => {
              console.log("GOOGLE LOGIN ERROR:", err);
            }}
            render={(renderProps) => (
              <LoadingButton
                fullWidth
                size="large"
                variant="contained"
                sx={{
                  borderColor: "#4285F4",
                  backgroundColor: "#4285F4",
                  fontSize: "1.2rem",
                  py: 1.2,
                }}
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
              >
                <FaGoogle />
              </LoadingButton>
            )}
            cookiePolicy={"single_host_origin"}
          /> 
        </Stack>

      </FormProvider>
      </CardContent>

    </Card>

    
    </Container>


  );

}

export default LoginPage;
