const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require("../models/user");

const router = express.Router();

//회원가입 라우터에 post 메소드가 왔을 경우 
router.post('/join', isNotLoggedIn,async(req, res, next) => {
    const { studentID, name, phoneNumber, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    try {
        const exUser = await User.findOne({ where: { studentID }});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, salt);
        await User.create({
            studentID,
            name,
            phoneNumber,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

//로그인 라우터에서 post 요청이 왔을 경우
router.post('/login', isNotLoggedIn,async(req, res, next) => {
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
            return res.redirect('/');
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