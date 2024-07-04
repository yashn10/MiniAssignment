const mongoose = require('mongoose');


const StateSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    countryId: {
        type: Number,
        required: true
    }

})


const State = mongoose.model("State", StateSchema);

module.exports = State;
