import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../redux/authSlice";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

type AuthFormProps = {
  formMode: "login" | "register";
};
type Fields = "email" | "password" | "confirmPassword";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const AuthForm: React.FC<AuthFormProps> = ({ formMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const handleAuth = (values) => {
    dispatch(authUser({ user: values, formMode }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Navigate back to the flight list
    }
  }, [isAuthenticated, navigate]);

  return (
    <form onSubmit={handleSubmit(handleAuth)}>
      <Grid container spacing={2}>
        {(
          [
            "email",
            "password",
            ...(formMode === "register" ? ["confirmPassword"] : []),
          ] as Fields[]
        ).map((field) => (
          <Grid item xs={12} key={field}>
            <TextField
              {...register(field)}
              label={field === "confirmPassword" ? "Confirm Password" : field}
              variant="outlined"
              fullWidth
              type={
                field === "password" || field === "confirmPassword"
                  ? "password"
                  : undefined
              }
              error={!!errors[field]}
              helperText={errors[field]?.message}
              autoComplete="current-password"
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {formMode === "login" ? "Login" : "Register"}
          </Button>
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default AuthForm;
