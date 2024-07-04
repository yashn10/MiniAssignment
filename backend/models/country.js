const mongoose = require('mongoose');


const countrySchema = new mongoose.Schema({

    id: {
        type:Number,
        required: true
    },

    name: {
        type: String,
        required: true
    }

})


const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
