const jwt = require('jsonwebtoken');


module.exports = function authenticateToken (req, res, next){
    const token = req.headers['auth-token']
  
    if (token == null) return res.status(401).send({message : "Token not available"});
  
    jwt.verify(token, process.env.PRIVATEKEY, (err, user) => {
  
      if (err) return res.status(403).send({message : err.message})
  
      req.user = user
        // console.log(user)
      next()
    })
  }
