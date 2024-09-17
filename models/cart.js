const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newcart = new Schema({
    
    product_id: {
        type: String,
        required: true
    }});
module.exports = mongoose.model('cart', newcart);