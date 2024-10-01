const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const userContoller = require("../controller/users.js");
const { saveRedirectUrl } = require("../middleware.js");
router
  .route("/signup")
  .get(userContoller.renderSignupForm)
  .post(wrapAsync(userContoller.Signup));
router
  .route("/login")
  .get(userContoller.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userContoller.Login
  );
router.get("/logout", userContoller.Logout);
module.exports = router;
