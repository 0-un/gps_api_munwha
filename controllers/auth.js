require('dotenv').config();
exports.auth = (req,res,next)=>{
    
    res.render('auth');
}