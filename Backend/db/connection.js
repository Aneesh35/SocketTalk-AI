import mongoose from "mongoose";
const MongoUri=process.env.MONGODB_URI
export const DataBase_connect=()=>{
    mongoose.connect(MongoUri).then(()=>{
        console.log(`DataBase Connection success!!`);
    }).catch(err=>{
        console.log(err);
    })
}