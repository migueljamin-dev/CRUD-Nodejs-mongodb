const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const itemSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},{ timestamps:true });

// to see the collection like Items the put the model to item
const Item = mongoose.model('Item',itemSchema);
module.exports = Item;