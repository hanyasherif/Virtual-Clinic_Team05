const jwt = require('jsonwebtoken');

const requireAuth =(role) =>{return (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(role);
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        console.log(decodedToken.user.type);
        if(role==decodedToken.user.type || role=='ALL')
        {
          console.log("yes")
          next();
        }
        else{
          console.log("no")
          res.status(401).json({message:"You are not Authorized to access this webpage."})
        }
        //console.log(decodedToken);
        
      }
    });
  } else {
    res.status(401).json({message:"You are not logged in."})
  }
}
};


module.exports = { requireAuth };