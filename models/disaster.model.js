const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const DisasterSchema=mongoose.Schema({//will describe how our data looks like
    disasterName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dateDiscovered:{
        type:Date,
        default:Date.now
    },
    responseStatus:{
        type:String,
        default: "Not addressed"
    },

});
const Disaster = mongoose.model('disasters', DisasterSchema);

module.exports= Disaster;