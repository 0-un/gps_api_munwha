const express = require('express');
const router = express.Router();
const axios = require('axios')
//kakao logout

router.get('/', async (req,res)=>{
  const socialDiv = req.query.div;
  if(socialDiv == 'kakao'){
    try {
      const ACCESS_TOKEN = req.query.token;
      
      let logout = await axios({
        method:'post',
        url:'https://kapi.kakao.com/v1/user/unlink',
        headers:{
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      });
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }else{
    try {
      const ACCESS_TOKEN = req.query.token;
      
      let logout = await axios({
        method:'post',
        url:`https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NAVER_ID}&client_secret=${process.env.NAVER_SECRET}&access_token=${ACCESS_TOKEN}&service_provider=NAVER`,
      });
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }
      // 세션 정리
      req.logout((err)=>{
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/');
      });
    
      
      
})

module.exports = router