const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const listingSchema=new Schema({
    title:{
    type:String,
    required:true,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        default:"https://unsplash.com/photos/white-boat-on-body-of-water-near-green-palm-trees-n7DY58YFg9E",
        set:(v)=>v===""? "https://unsplash.com/photos/white-boat-on-body-of-water-near-green-palm-trees-n7DY58YFg9E":v,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;