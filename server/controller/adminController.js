var AdminDb = require('../model/adminModel');
const bcrypt = require('bcrypt');


// create
// exports.register = (req,res)=>{
//     if(!req.body){
//         res.status(400).send({message:"Content can't be empty! "});
//         return;
//     }

//     const admin = new AdminDb({
//         name : req.body.name,
//         email : req.body.email,
//         password: req.body.password
//     })

//     admin.save(admin).then(data =>{
//         res.send(data)
//     }).catch(err =>{
//         res.status(500).send({
//             message:err.message || "Error During Creation ......"
//         });
//     });
// }

// exports.login = (req,res)=>{
//     return res.send({message: "Admin Login ..."})
// }


const adminController ={

    register: async (req, res)=>{
        if(!req.body){
                    res.status(400).send({message:"Content can't be empty! "});
                    return;
                }
                const saltRounds = 12;
                const password = req.body.password;
                
                const hash = bcrypt.hashSync(password, saltRounds);

                const admin = new AdminDb({
                    name : req.body.name,
                    email : req.body.email,
                    password: hash
                })
            
                admin.save(admin).then(data =>{
                    res.send(data)
                }).catch(err =>{
                    res.status(500).send({
                        message:err.message || "Error During Creation ......"
                    });
                });
    },
    login: async (req, res) => {
        if(!req.body){
            res.status(400).send({message:" Enter all the fields! "});
            return;
        }
        AdminDb.find({email:req.body.email}).then(admin =>{
            console.log("admin data--------",admin[0].password);
            
            return res.send(admin);
        }).catch(err =>{
            return res.status(404).send({message:err.message || "Data not found"})
        });
    }
}

module.exports= adminController;