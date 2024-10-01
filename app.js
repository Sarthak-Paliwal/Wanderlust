if(process.env.NODE_ENV!="production"){
  require("dotenv").config();
}//we never use our dotenv files in the production phase so at the time of Deployment we will create a new Environmental 
//variable NODE_ENV
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
app.engine("ejs", ejsMate);
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

main()
  .then((res) => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
const sessionOptions={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
  },
  httpOnly:true,
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
});

//using different routes from routes directory
app.use("/listings", listingRouter);
app.use("/", userRouter);
app.use("/listings/:id/reviews", reviewRouter);
//Error handling Middlewares
app.all("*", (req, res, next) => {
  console.log(err);
  next(new ExpressError(404, "Page Not Found"));
});
//Express Error Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).render("error.ejs", { message });
});
app.listen(8080, () => {
  console.log("listening on port 8080");
});
