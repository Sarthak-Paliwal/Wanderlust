const Listing=require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
};
module.exports.rendernewForm=(req,res)=>{
    res.render("./listings/new.ejs");
};
module.exports.createListing=async (req,res,next)=>{
    let response=await geocodingClient.forwardGeocode ({
        query: req.body.listing.location,
        limit: 1,
      })
        .send();
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=await new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;
    let saveListing=await newListing.save();
    console.log(saveListing);
    req.flash("success","new listing created!");
    res.redirect("/listings");
};
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","listing you requested for does not exist!");
        res.redirect("/listings")
    }
    
    res.render("./listings/show.ejs",{listing});
};
module.exports.rendereditForm=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you requested for does not exist!");
        res.redirect("/listings")
    }
    let originalImage=listing.image.url;
    originalImage=originalImage.replace("/upload","/upload/h_300,w_250");
    res.render("./listings/edit.ejs",{listing,originalImage});

};
module.exports.updateListings=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
   console.log(req.body);
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename}; 
        await listing.save();
    }    
    req.flash("success","listing updated successfully!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success","listing Deleted!");
    res.redirect("/listings");
};