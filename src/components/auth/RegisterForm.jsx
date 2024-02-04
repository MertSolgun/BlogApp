import React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Form, Formik } from "formik";
import { object, string, number, date, InferType } from "yup";
import { FormHelperText } from "@mui/material";
import useAuthCalls from "../../hooks/useAuthCalls";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSchema2 = object({
    username: string().required("Username is required"),
    firstName: string().required("First name is required"),
    lastName: string().required("Last name is required"),
    email: string()
      .email("Please enter a valid email")
      .required("Email login is required"),
    password: string()
      .required("Şifre zorunludur.")
      .min(8, "Şifre en az 8 karakter içermelidir")
      .max(16, "Şifre en falza 16 karakter içermelidir")
      .matches(/\d+/, "Şifre en az bir rakam içermelidir")
      .matches(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
      .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
      .matches(
        /[@$!%*?&]+/,
        "Şifre en az bir özel karakter (@$!%*?&) içermelidir"
      ),
    bio: string().required("Bio is required"),
    image: string().url("Please enter a valid URL").required("URL is required"),
  });

  const { register } = useAuthCalls();

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
          firstName: "",
          lastName: "",
          image: "",
          bio: "",
        }}
        validationSchema={handleSchema2}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          register(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                variant="outlined"
                label="Username"
                name="username"
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                onBlur={handleBlur}
                autoFocus
                value={values.username}
                helperText={touched.username && errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="First Name"
                type="text"
                variant="outlined"
                id="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                variant="outlined"
                name="lastName"
                label="Last Name"
                type="text"
                onChange={handleChange}
                id="lastName"
                error={errors.lastName && Boolean(touched.lastName)}
                onBlur={handleBlur}
                helperText={touched.lastName && errors.lastName}
                value={values.lastName}
              />
              <TextField
                margin="normal"
                required
                variant="outlined"
                fullWidth
                name="email"
                label="Email"
                type="email"
                onChange={handleChange}
                id="email"
                error={errors.email && Boolean(touched.email)}
                onBlur={handleBlur}
                value={values.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="normal"
                quired
                fullWidth
                name="image"
                label="Image"
                onChange={handleChange}
                variant="outlined"
                type="url"
                id="image"
                error={errors.image && Boolean(touched.image)}
                onBlur={handleBlur}
                value={values.image}
                helperText={touched.image && errors.image}
              />
              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                name="bio"
                label="Bio"
                onChange={handleChange}
                type="text"
                id="bio"
                error={errors.bio && Boolean(touched.bio)}
                onBlur={handleBlur}
                value={values.bio}
                helperText={touched.bio && errors.bio}
              />
              <FormControl
                sx={{ mt: 2, width: "100%" }}
                variant="outlined"
                error={touched.password && Boolean(errors.password)}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  error={errors.password && Boolean(touched.password)}
                  onBlur={handleBlur}
                  value={values.password}
                  variant="outlined"
                />
                {touched.password && errors.password && (
                  <FormHelperText id="password-helper-text">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login/" variant="body2">
                    {"Already have an account? Sign in "}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
