import React, { useState, useEffect } from "react";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ExtAxios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const betAmounts = [100, 200, 500];
const betOptions = ["7 up", "7 down", "lucky 7"];

const Playground = () => {
  const name = useSelector((state) => state.user.name);
  const points = useSelector((state) => state.user.points);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [betAmount, setBetAmount] = useState("");
  const [betOption, setBetOption] = useState("");
  const [diceOne, setDiceOne] = useState(0);
  const [diceTwo, setDiceTwo] = useState(0);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (points < 0) {
      setModalOpen(true);
    }
  }, [points]);

  const handleBetAmountChange = (event) => {
    setBetAmount(event.target.value);
  };

  const handleBetOptionChange = (event) => {
    setBetOption(event.target.value);
  };

  const handleSubmit = async () => {
    if (!betAmount || !betOption) {
      setError("Please select both bet amount and bet option");
      setOpen(true);
      return;
    }
    try {
      const { data } = await ExtAxios.post("/api/v1/play", {
        bet: betAmount,
        option: betOption,
      });
      const { dice_one, dice_two, new_points, is_win } = data.data;
      setDiceOne(dice_one);
      setDiceTwo(dice_two);
      setIsWin(is_win);
      dispatch(addPoints(parseInt(new_points)));
    } catch (error) {
      setError("something went wrong");
      setOpen(true);
      return;
    }

    setError("");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    sessionStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h6" component="h4" gutterBottom>
          Welcome {name}! Let's Play 🎰
        </Typography>
        <Typography variant="h6" component="h4" gutterBottom>
          Your Current Score is: {points}
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
        <Box display="flex" justifyContent="space-around" mt={2} width="100%">
          <Typography variant="h6" component="div">
            Dice One: {diceOne === 0 ? "?" : diceOne}
          </Typography>
          <Typography variant="h6" component="div">
            Dice Two: {diceTwo === 0 ? "?" : diceTwo}
          </Typography>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity={error ? "error" : isWin ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {error || (isWin ? "Congratulations, you won!" : "Sorry, you lost!")}
        </MuiAlert>
      </Snackbar>
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          <Typography>Your points are below 0. The game is over.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Playground;
