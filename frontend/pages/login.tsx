import { useState, ChangeEvent, FormEvent, SyntheticEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Notification from "@/components/Notification";

import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", formData);
      localStorage.setItem("token", res.data.token);
      setNotification({
        open: true,
        message: 'Login successful!',
        severity: 'success'
      });
      setTimeout(() => {
        router.push('/stocks');
      }, 2000);
    } catch (err) {
      console.error("Error loggin in:", err);
      setNotification({
        open: true,
        message: 'Error logging in.',
        severity: 'error'
      });
    }
  };

  const handleClose = (event?: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };


  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </form>
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          handleClose={handleClose}
        />
      </Box>
    </Container>
  );
};

export default Login;
