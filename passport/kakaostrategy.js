const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;

module.exports = () =>{
    passport.use('kakao', new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        // clientID:fefbdf92a65b40c4883742ba6439f2f0,
        callbackURL: '/auth/kakao/callback',     // 위에서 설정한 Redirect URI
      }, async (accessToken, refreshToken, profile, done) => {
    
        try{
            
            const tokenUser = {
                user : profile,
                token : accessToken || '',
                div : "kakao"
            }
            done(null,tokenUser);
        }catch(e){
            console.log(e);
            done(e)
        }    
    }))
}