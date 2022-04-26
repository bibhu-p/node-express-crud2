var UserDb = require('../model/userModel');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const userController = {
    register: async (req, res) => {
        if (!req.body) {
            res.status(400).send({ message: "Fill all the fields! " });
            return;
        }

        const saltRounds = 12;
        const password = req.body.password;

        const hash = bcrypt.hashSync(password, saltRounds);


        const user = new UserDb({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            address: req.body.address,
            age: req.body.age,
            adhaar: req.body.adhaar,
            phone: req.body.phone
        });


        user.save(user).then(data => {
            return res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error During Creation ......"
            });
        });
    },
    login: async (req, res) => {
        if (!req.body) {
            return res.status(400).send({ message: " Enter all the fields! " });
        }
        await UserDb.find({ email: req.body.email }).then(user => {
            if (user.length > 0) {
                bcrypt.compare(req.body.password, user[0].password).then((result) => {
                    if (result) {
                        var authToken = jwt.sign({ id: user[0]._id }, process.env.PRIVATEKEY);
                        // console.log(authToken);
                        return res.status(200).json({success:true, data:user[0],token:authToken});
                    } else {
                        return res.status(500).send({ message: "Invalid Password!" });
                    }
                });
            }
            else {
                return res.status(500).send({ message: "User Not Found !" });
            }
        }).catch(err => {
            return res.status(404).send({ message: err.message || "Data not found" })
        });
    },
    find: async (req, res) => {
        UserDb.find().populate('movie').exec((err, user) => {
            if (user) {
                return res.status(200).send(user);
            } else {
                return res.send({ message: err.message });
            }
        });

    },
    findById: async (req, res) => {
        if (!req.params.id) {
            return res.status(404).send({ message: "Provide ID!! " });
        }
        else {
            const id = req.params.id;
            UserDb.findById(id).populate('movie').exec((err, user) => {
                if (user) {
                    return res.status(200).send(user);
                } else {
                    return res.send({ message: err.message });
                }
            });
        }
    },
    update: async (req, res) => {
        if (!req.body) {
            return res.status(400).send({ message: "Update data can't be empty..." });
        }
        const body = req.body;
        const id = req.params.id;

        if (body.movie) {
            try {
                let userData = await UserDb.findById(id);
                if (userData.movie.length > 0) {

                    if (!userData.movie.includes(body.movie)) {
                        userData.movie.push(body.movie);
                    }

                    body.movie = userData.movie;

                    let updateData = await UserDb.findByIdAndUpdate(id, body, { userFindAndModify: false })
                    if (updateData) {
                        return res.status(200).json({ success: true, message: "Data updated", data: updateData });
                    }
                } else {
                    let updateData = await UserDb.findByIdAndUpdate(id, body, { userFindAndModify: false })
                    if (updateData) {
                        return res.status(200).json({ success: true, message: "Data updated", data: updateData });
                    }
                }
            } catch (err) {
                return res.status(500).json({ success: false, message: err });
            }
        } 
        else {
            let updateData = await UserDb.findByIdAndUpdate(id, body, { userFindAndModify: false })
            if (updateData) {
                return res.status(200).json({ success: true, message: "Data updated", data: updateData });
            }
        }

    },
    delete: async (req, res) => {
        const id = req.query.id;

        UserDb.findByIdAndDelete(id).then(data => {

            if (!data) {
                return res.status(404).send({ message: `User Not Found ${id}` })
            } else {
                return res.send({ message: "User Deleted Successfully..." })
            }
        }).catch(err => {
            return res.status(500).send({ message: "Error During Delete.." });
        });
    }
}

module.exports = userController