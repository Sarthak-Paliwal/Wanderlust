const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const reviewController=require("../controller/reviews.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
//post review route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));
//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));
module.exports=router;