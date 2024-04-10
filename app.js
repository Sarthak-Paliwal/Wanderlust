const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const ejsMate=require("ejs-mate");
app.engine('ejs',ejsMate);
const methodOverride=require("method-override");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
main().then((res)=>{
    console.log("Connected");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
app.get("/",(req,res)=>{
    res.send("Root working");
})
//index route
app.get("/listings", async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});
//create and new route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
})
//create route
app.post("/listings",async (req,res)=>{
    const newListing=await new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});
//Show route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
})
//edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});

});
//update route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let newListings=req.body.listing;
    await Listing.findByIdAndUpdate(id,{...newListings});
    res.redirect(`/listings/${id}`);
});
//delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log(deletedListing);
})


app.listen(8080,()=>{
    console.log("listening on port 8080");
})