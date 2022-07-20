const express = require('express');
const authController = require('../controllers/auth');
const passport = require('passport');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares')
const router = express.Router();

// router.use((req,res,next)=>{
//     res.locals.user = req.user;

// })



//kakao 로그인
router.get('/kakao',passport.authenticate('kakao'));

router.get('/kakao/callback',passport.authenticate('kakao',{failureRedirect:'/'}),
(req,res)=>{
    res.redirect('/');
})

//네이버 로그인
router.get('/naver', passport.authenticate('naver'));

//? 위에서 네이버 서버 로그인이 되면, 네이버 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
router.get(
    '/naver/callback',

    //? 그리고 passport 로그인 전략에 의해 naverStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
    passport.authenticate('naver', { 

        failureRedirect: '/auth' }),
    (req, res) => {
    res.redirect('/');
    },
);

//login
router.get('/',authController.auth);

//local login
router.post('/',(req,res,next)=>{
    console.log(req.body);
})

module.exports = router;