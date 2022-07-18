require('dotenv').config();

exports.getPosts = (req,res,next)=>{
        var token = '';
        var div= '';
        var displayName = '';
        var email = '';
    if(req.session.passport){
        console.log(req.session.passport.user)
        displayName = req.session.passport.user.user.displayName;
        token = req.session.passport.user.token;
        div = req.session.passport.user.div;
        email = req.session.passport.user.user._json.email;
    }

    res.render('index.ejs', {
        title: 'Express',
        displayName:displayName,
        token:token,
        div: div
    });
    //res.render('index', { title: 'Express' ,displayName:'',token:'',div:''});
 
}