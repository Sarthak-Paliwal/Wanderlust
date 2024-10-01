const User = require("../models/user.js");
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};
module.exports.Signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const regUser = await User.register(newUser, password);
    req.login(regUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User registered Successfully!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};
module.exports.Login = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
module.exports.Logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "User Logged out!");
    res.redirect("/listings");
  });
};
