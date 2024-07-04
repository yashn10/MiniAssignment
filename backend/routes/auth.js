const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const State = require('../models/state');
const Country = require('../models/country');
const Employee = require('../models/employee');



router.post("/employee", async (req, res) => {

    const { name, email, password, mobile, country, state } = req.body;

    if (!name || !email || !password || !mobile || !country || !state) {
        return res.status(400).json({ error: "please fill all the fields" });
    }

    try {

        const userexist = await Employee.findOne({ email: email });

        if (userexist) {
            return res.status(401).json({ error: "user already exists" });
        } else {
            const user = new Employee({ name, email, password, mobile, country, state });

            const saveuser = await user.save();

            if (saveuser) {
                return res.status(201).json({ message: "employee registered successfully" });
            } else {
                return res.status(401).json({ error: "employee registration failed" });
            }
        }

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

})



router.post("/employeelogin", async (req, res) => {

    const { password, email } = req.body;

    if (!password || !email) {
        return res.status(400).json({ error: "please fill all the fields" });
    }

    try {
        const userexist = await Employee.findOne({ email: email });

        if (userexist) {
            const ismatch = await bcrypt.compare(password, userexist.password);

            if (ismatch) {
                const token = await userexist.generateAuthToken();

                return res.status(201).json({ token });
            } else {
                return res.status(404).json({ error: "Invalid Credentials" });
            }
        } else {
            return res.status(404).json({ error: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Side Error Occurs" });
    }

})




router.post("/country", async (req, res) => {
    let success = false

    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ success, error: "please fill all the fields" });
    }

    try {

        const userexist = await Country.findOne({ id: id });

        if (userexist) {
            return res.status(401).json({ success, error: "user already exists" });
        } else {
            const user = new Country({ id, name });

            const saveuser = await user.save();

            if (saveuser) {
                let success = true
                return res.status(201).json({ success, message: "data registered successfully" });
            } else {
                let success = false
                return res.status(401).json({ success, error: "data registration failed" });
            }
        }

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }

})



router.post("/state", async (req, res) => {
    let success = false

    const { id, name, countryId } = req.body;

    if (!id || !name || !countryId) {
        return res.status(400).json({ success, error: "please fill all the fields" });
    }

    try {

        const userexist = await State.findOne({ id: id });

        if (userexist) {
            return res.status(401).json({ success, error: "user already exists" });
        } else {
            const user = new State({ id, name, countryId });

            const saveuser = await user.save();

            if (saveuser) {
                let success = true
                return res.status(201).json({ success, message: "data registered successfully" });
            } else {
                let success = false
                return res.status(401).json({ success, error: "data registration failed" });
            }
        }

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }

})




router.get("/employee", async (req, res) => {
    try {
        const employee = await Employee.find();
        res.status(201).json(employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})





router.get("/country", async (req, res) => {
    try {
        const country = await Country.find();
        res.status(200).json(country);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})





router.get("/state", async (req, res) => {
    try {
        const state = await State.find();
        res.send(state);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})




router.delete("/employee/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const employee = await Employee.findByIdAndDelete(_id);
        res.status(201).send(employee);
    } catch (error) {
        console.log("error", error);
    }
})




router.delete("/country/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const country = await Country.findByIdAndDelete(_id);
        res.status(201).send(country);
    } catch (error) {
        console.log("error", error);
    }
})




router.delete("/state/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const state = await State.findByIdAndDelete(_id);
        res.status(201).send(state);
    } catch (error) {
        console.log("error", error);
    }
})





router.patch("/employee/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const employee = await Employee.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(employee);
        console.log(employee);

    } catch (err) {
        console.status(400).log(err);
    }
})




router.patch("/country/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        // Check if _id is valid ObjectId format before proceeding
        if (!mongoose.isValidObjectId(_id)) {
            return res.status(400).json({ error: 'Invalid country ID' });
        }
        const country = await Country.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        res.json(country);
        console.log(country);

    } catch (err) {
        console.error('Error updating country:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})




router.patch("/state/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const state = await State.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(state);
        console.log(state);

    } catch (err) {
        console.status(400).log(err);
    }
})




module.exports = router;
