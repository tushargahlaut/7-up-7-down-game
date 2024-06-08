const {Router} = require("express");
const { login_user_controller, roll_dice_controller } = require("../controllers/user_controller");
const { validate_token } = require("../controllers/validate_token");

const router = Router();

router.post("/login", login_user_controller);
router.post("/play", validate_token, roll_dice_controller);

module.exports = {router};