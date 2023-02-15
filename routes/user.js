const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require("../models/user");

const router = express.Router();

//회원가입 라우터에 post 메소드가 왔을 경우 
router.post('/register', isNotLoggedIn, async(req, res, next) => {
    const { sid, name, phone, pw } = req.body;
    const salt = bcrypt.genSaltSync(10);
    try {
        const exUser = await User.findOne({ where: { sid }});
        if(exUser){
            return res.redirect('/register?error=exist');
        }
        const hash = await bcrypt.hash(pw, salt);
        await User.create({
            sid,
            name,
            phone,
            pw: hash,
        });
        return res.send({"result": true}).status(200);
    } catch (error) {
        console.error(error);
        return res.status(400).send({"result": false});
    }
});

//로그인 라우터에서 post 요청이 왔을 경우
router.post('/check', isNotLoggedIn,async(req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.send(
                {
                "result": true
                });
        });
    })(req, res, next); //미들웨어 내의 미들웨어에는 (req,res,next)를 붙이라고 함.
});


//로그아웃 처리
router.get('/logout', isLoggedIn, (req,res)=> {
    req.logout(() => { 
        res.redirect('/');
      }); //메인페이지로 재연결
});

module.exports = router;