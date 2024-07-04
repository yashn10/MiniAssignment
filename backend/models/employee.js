const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    mobile: {
        type: Number,
        required: true,
        unique: true
    },

    country: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    tokens: [
        {
            token: {
                type: String,
                required: true,
                unique: true
            }
        }
    ]

})


employeeSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    next();

})

employeeSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        this.save();
        return token;
    } catch (error) {
        console.log(error, "error");
    }
}


const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
