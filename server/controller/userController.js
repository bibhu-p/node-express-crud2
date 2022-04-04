var UserDb = require('../model/userModel');
const bcrypt = require('bcrypt');


const userController ={
    register : async(req,res)=>{
        if(!req.body){
            res.status(400).send({message: "Fill all the fields! "});
            return;
        }
        
        const saltRounds = 12;
        const password = req.body.password;

        const hash = bcrypt.hashSync(password, saltRounds);
        console.log(hash);

        const user = new UserDb({
            name : req.body.name,
            email : req.body.email,
            password: hash,
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
        if (!req.body) {
            res.status(400).send({ message: " Enter all the fields! " });
            return;
        }
        await UserDb.find({ email: req.body.email }).then(user => {
            if (user.length > 0) {
                bcrypt.compare(req.body.password, user[0].password).then((result) => {
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
    },
    find : async(req,res)=>{
            UserDb.find().then(user =>{
                res.send(user)
            }).catch(err =>{
                res.status(500).send({
                    message:err.message || "Error During Searching.."
                })
            });
        
    },
    findById: async(req,res)=>{
        if(!req.params.id){
            return  res.status(404).send({message:"Provide ID!! "});
        }else{
            const id = req.params.id;
            UserDb.findById(id).then(data =>{
            if(!data){
                res.status(404).send({message:`User Not Found ${id}`})
            }else{
                res.send(data)
            }}).catch(err =>{
                res.status(500).send({message:"Error .."});
            });
        }
    },
    update :async(req,res)=>{
        if(!req.body){
            return res.status(400).send({message: "Update data can't be empty..."});
        }
    
        const id = req.params.id;
        await UserDb.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
        .then(data =>{
            if(!data){
                res.status(404).send({message:`User Not Found ${id}`})
            }else{
                res.send(data)
            }
        }).catch(err =>{
            res.status(500).send({message:"Error During Update.."});
        });
    },
    delete : async(req,res)=>{
        const id = req.query.id;

        // return res.send(req.query)
        UserDb.findByIdAndDelete(id).then(data =>{
            console.log("Delete block ......");
            // return console.log(data);
            if(!data){
                res.status(404).send({message:`User Not Found ${id}`})
            }else{
                res.send({message:"User Deleted Successfully..."})
            }
            }).catch(err =>{
            res.status(500).send({message:"Error During Delete.."});
        });
    }
}

module.exports = userController