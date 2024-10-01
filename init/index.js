const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
main().then((res)=>{
    console.log("Connected");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
const initDb=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj, owner:"663a0564d72b8aa5d7f330cb"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialised");
};
initDb();