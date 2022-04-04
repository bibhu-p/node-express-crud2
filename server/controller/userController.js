var UserDb = require('../model/userModel');


const userController ={
    register : async(req,res)=>{
        if(!req.body){
            res.status(400).send({message:"Content can't be empty! "});
            return;
        }
    
        const user = new UserDb({
            name : req.body.name,
            email : req.body.email,
            password: req.body.password,
            address: req.body.address,
            age : req.body.age,
            adhaar : req.body.adhaar,
            phone : req.body.phone
        })
    
        user.save(user).then(data =>{
            return res.send(data);
        }).catch(err =>{
            res.status(500).send({
                message:err.message || "Error During Creation ......"
            });
        });
    },
    login : async(req,res)=>{

    }
}

module.exports = userController