const mongooose = require("mongoose");
const productSchema = new mongooose.Schema({
    name:String,
    price : Number,
    quantity: Number,
    category: String
});
module.exports = mongooose.model('products', productSchema);