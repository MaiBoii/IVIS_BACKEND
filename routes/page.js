const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares'); //로그인/로그아웃 상태에 따라 접근권한 줌
const Apply = require('../models/apply');

router.use((req,res,next) => {
    res.locals.user=req.user;
    next();
});

//회원가입 페이지
router.get('/register',isNotLoggedIn ,(req, res)=>{
    return res.status(200).send('Ready to register?!');
});

//신청서 페이지
router.get('/application',isLoggedIn, async (req, res) => {
    try{
        const sid=req.cookies.sid;
        const appliedUser = await Apply.findOne({ where:{ sid }});
        if(appliedUser){
            return res.send(appliedUser);
        }
    }
    catch (error) {
        console.error(error);
        return next(error);
    }});

//메인 페이지
router.get('/', (req, res, next) => {
    return res.status(200).send('Entered main');
});

module.exports = router;