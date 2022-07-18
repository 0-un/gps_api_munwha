const passport = require('passport')
var NaverStrategy = require('passport-naver').Strategy;

module.exports = ()=>{
    passport.use(new NaverStrategy({
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: '/auth/naver/callback'
	},
    async (accessToken, refreshToken, profile, done) => {
        // 이 부분은 자신의 개발환경에 맞게 설정하시면 됩니다.
        try{
           
            const tokenUser = {
                user : profile,
                token : accessToken || '',
                div: "naver"
            }
            done(null,tokenUser);
        }catch(e){
            console.log(e);
            done(e)
        } 
    }
));
}