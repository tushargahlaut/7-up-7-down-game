import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPoints } from "../../redux/user_slice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const betAmounts = [100, 200, 500];
const betOptions = ["7 up", "7 down", "lucky 7"];

const Playground = () => {
  const name = useSelector((state) => state.user.name);
  const points = useSelector((state) => state.user.points);
  const dispatch = useDispatch();

  const [betAmount, setBetAmount] = useState("");
  const [betOption, setBetOption] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleBetAmountChange = (event) => {
    setBetAmount(event.target.value);
  };

  const handleBetOptionChange = (event) => {
    setBetOption(event.target.value);
  };

  const handleSubmit = () => {
    if (!betAmount || !betOption) {
      setError("Please select both bet amount and bet option");
      setOpen(true);
      return;
    }

    // This is where you would handle the bet logic
    // For now, let's just add the bet amount to the points
    dispatch(addPoints(-betAmount));
    setError("");
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
          User Info
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Name: {name}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Points: {points}
        </Typography>
        <TextField
          select
          label="Bet Amount"
          value={betAmount}
          onChange={handleBetAmountChange}
          fullWidth
          margin="normal"
        >
          {betAmounts.map((amount) => (
            <MenuItem key={amount} value={amount}>
              {amount}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Bet Option"
          value={betOption}
          onChange={handleBetOptionChange}
          fullWidth
          margin="normal"
        >
          {betOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Bet
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || "Bet Submitted"}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Playground;
