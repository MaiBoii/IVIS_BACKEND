const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require("../models/user");

const router = express.Router();

//회원가입 라우터에 post 메소드가 왔을 경우 
router.post('/register', isNotLoggedIn, async(req, res) => {
    const { sid, pw, name, phone} = req.body;
    const salt = bcrypt.genSaltSync(10);
    try {
        const exUser = await User.findOne({ where: { sid }});
        if(exUser){
            return res.status(409).send('이미 가입된 회원입니다.');
        }
        const hash = await bcrypt.hash(pw, salt);
        await User.create({
            sid,
            pw: hash,
            name,
            phone,
        });
        return res.send({"result": true}).status(200);
    } catch (error) {
        console.error(error);
        if(req.method !== 'POST'){
            res.send.status(405);
        }
        return res.status(400).send({"result": false});
    }
});

//sidcheck POST
router.post('/sidcheck', isNotLoggedIn, async (req, res)=> {
    const {sid} = req.body;
    try{
        const exUser = await User.findOne({ where:{ sid:sid }})
        if(exUser){
            res.send({
                "result":true
            });
        }
        else{
            res.send({
                "result":false
            })
        }
    }
    catch{
        if(req.method !== 'POST'){
            return res.status(405);
        }
        return res.status(400);
    }
})

//pwcheck POST
router.post('/pwcheck', isNotLoggedIn, async (req, res)=> {
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
            res.send(
                {
                "result": true
                });
        });
    })(req, res); //미들웨어 내의 미들웨어에는 (req,res)를 붙이라고 함.
});


//로그아웃 처리
router.get('/logout', isLoggedIn, (req,res)=> {
    req.logout(() => { 
        res.redirect('/');
      }); //메인페이지로 재연결
});

module.exports = router;