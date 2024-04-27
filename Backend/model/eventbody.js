const  mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    Eventname: { 
        type: String, 
        required: true 
    },
    slug:{
        type :String
    },
    Eventdescription:{
        type:String,
        required:true
    },
    Eventcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'EventCategory',
        required:true
    },
    people:{
        type:Number,
        required:true
    },
    Conductedby:{
        type:String,
        required:true
    },
    Address:{
        type:{},
        required:true
    }
},{timestamps:true})
module.exports = mongoose.model("EventBody",productSchema);