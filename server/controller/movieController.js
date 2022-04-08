var MovieDb = require('../model/movieModel');
const multer  = require('multer');

const movieController ={
    // create
    create : async(req,res)=>{

        // console.log(req.body)
        // console.log(req.file)
        // return res.send('ok');

        if(!req.body){
            res.status(400).send({message:"Content can't be empty! "});
            return;
        }
        
          
        // const upload = multer({ storage: storage })
        
        const movie = new MovieDb({
            name : req.body.name,
            director : req.body.director,
            hero: req.body.hero,
            heroine : req.body.heroine,
            producer : req.body.producer
        })


        movie.save(movie).then(data =>{
            res.send(data)
        }).catch(err =>{
            res.status(500).send({
                message:err.message || "Error During Creation ......"
            });
        });
    },

    // retrieve
    find :async (req,res)=>{
        await MovieDb.find().then(movie =>{
            res.send(movie)
        }).catch(err =>{
            res.status(500).send({
                message:err.message || "Error During Searching.."
            })
        });
    },
    findById: async(req,res)=>{
        if(req.params.id){
            const id = req.params.id;
            await MovieDb.findById(id).then(data =>{
                if(!data){
                    res.status(404).send({message:`Movie Not Found ${id}`})
                }else{
                    res.send(data)
                }}).catch(err =>{
                    res.status(500).send({message:"Error .."});
                });
        }else{
            return res.status(400).send({message:`Movie Id missing`});
        }
    },
    update :async(req,res)=>{
        if(!req.body){
            return res.status(400).send({message: "Update data can't be empty..."});
        }
    
        const id = req.params.id;
        await MovieDb.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
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
    delete :async (req,res)=>{
        const id = req.params.id;
        await MovieDb.findByIdAndDelete(id).then(data =>{
            if(!data){
                res.status(404).send({message:`User Not Found ${id}`})
            }else{
                res.send({message:"User Deleted Successfully..."})
            }
            }).catch(err =>{
            res.status(500).send({message:"Error During Delete.."});
        });
    }
    // uploadPoster : async (req,res)=>{
    //     // var file = req.body.posterUrl;
    //     // const storage = multer.diskStorage({
    //     //         destination: function (req, file, cb) {
    //     //         cb(null, '/assets/uploads')
    //     //         },
    //     //         filename: function (req, file, cb) {
    //     //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //     //         cb(null, file.fieldname + '-' + uniqueSuffix)
    //     //         }
    //     //     })

    //     // const upload = multer({storage: storage }).single("poster");
    //     const upload = multer({dest: 'uploads/' }).single("poster");
    //     upload(req, res, (err) => {
    //         if(err) {
    //           res.status(400).send("Something went wrong!");
    //         }
    //         console.log("Uploaded >>>>>>>>>>>>>.");
    //         // const storage = multer.diskStorage({
    //         //     destination: function (req, file, cb) {
    //         //     cb(null, '/assets/uploads')
    //         //     },
    //         //     filename: function (req, file, cb) {
    //         //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //         //     cb(null, file.fieldname + '-' + uniqueSuffix)
    //         //     }
    //         // })
    //         res.send(req.body);
    //       });

        
    // }
}

module.exports = movieController