const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    date: {type: Date, required: true},
    mileage: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);
