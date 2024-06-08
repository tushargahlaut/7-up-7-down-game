const { generateToken } = require("../utils/jwt_utils");
const { roll_dice } = require("../utils/roll_dice");

const login_user_controller = (req, res) => {
  try {
    const { name, points } = req.body;
    if (!name || !points) {
      return res.status(400).json({
        success: false,
        message: "Name or Points not provided",
      });
    }
    const payload = {
      name,
      points: parseInt(points),
    };
    const token = generateToken(payload);
    return res.status(200).json({
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error) {
    console.log("Error in Login User", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, try again later",
    });
  }
};

const roll_dice_controller = (req, res) => {
  try {
    const { bet, option } = req.body;
    if (!bet || !option) {
      return res.status(400).json({
        success: false,
        message: "Bet amount or option not provided",
      });
    }

    const dice_one = roll_dice();
    const dice_two = roll_dice();

    let is_win = true;
    let new_points = 0;

    if (
      (option === "7 up" && dice_one + dice_two > 7) ||
      (option === "7 down" && dice_one + dice_two < 7)
    ) {
      new_points = bet * 2;
    } else if (option === "lucky 7" && dice_one + dice_two === 7) {
      new_points = bet * 5;
    } else {
      new_points = -bet;
      is_win = false;
    }

    return res.status(200).json({
      success: true,
      data: {
        dice_one: dice_one,
        dice_two: dice_two,
        new_points: new_points,
        is_win,
      },
    });
  } catch (error) {
    console.log("Error in roll dice", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, try again later",
    });
  }
};

module.exports = { login_user_controller, roll_dice_controller };
