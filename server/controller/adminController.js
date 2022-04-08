var AdminDb = require('../model/adminModel');
const bcrypt = require('bcrypt');


const adminController = {

    register: async (req, res) => {


        if (!req.body) {
            res.status(400).send({ message: "Content can't be empty! " });
            return;
        }
        const saltRounds = 12;
        const password = req.body.password;

        const hash = bcrypt.hashSync(password, saltRounds);
        console.log(hash);

        

        const admin = new AdminDb({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })

        admin.save(admin).then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error During Creation ......"
            });
        });
    },
    login: async (req, res) => {
        if (!req.body) {
            res.status(400).send({ message: " Enter all the fields! " });
            return;
        }
        await  AdminDb.find({ email: req.body.email }).then(admin => {
            if (admin.length > 0) {
                bcrypt.compare(req.body.password, admin[0].password).then((result) => {
                    if (result) {
                        return res.status(200).send({ message: "Login Successful" });
                    } else {
                        return res.status(500).send({ message: "Invalid Password!" });
                    }
                });
            }
            else{
                return res.status(500).send({ message: "User Not Found !" });
            }
        }).catch(err => {
            return res.status(404).send({ message: err.message || "Data not found" })
        });
    }
}

module.exports = adminController;