// src/components/Login.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../redux/user_slice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BaseAxios } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setNameInput] = useState("");
  const [open, setOpen] = useState(false);
  const points = useSelector((state) => state.user.points);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const login = await BaseAxios.post("/api/v1/login", {
        name: name,
        points: points,
      });
      dispatch(setName(name));
      sessionStorage.setItem("accessToken", login.data.token);
      navigate("/play");
    } catch (error) {
      console.log("Error while logging in", error);
    }

    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} sx={{ width: "100%" }}>
          Login Done
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Login;
