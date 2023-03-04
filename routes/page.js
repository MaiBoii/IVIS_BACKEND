const express = require('express');
const path = require('path');
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



module.exports = router;
