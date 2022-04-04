var MovieDb = require('../model/movieModel');


// create
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content can't be empty! "});
        return;
    }

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
}

// retrieve
exports.find = (req,res)=>{

    if(req.query.id){
    const id = req.params.id;
    MovieDb.findById(id).then(data =>{
        if(!data){
            res.status(404).send({message:`Movie Not Found ${id}`})
        }else{
            res.send(data)
        }}).catch(err =>{
            res.status(500).send({message:"Error .."});
        });
    }else{
        MovieDb.find().then(movie =>{
            res.send(movie)
        }).catch(err =>{
            res.status(500).send({
                message:err.message || "Error During Searching.."
            })
        });
    }
}