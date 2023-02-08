const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares'); //로그인/로그아웃 상태에 따라 접근권한 줌

router.use((req,res,next) => {
    res.locals.user=req.user;
    next();
});

//회원가입 페이지
router.get('/join',isNotLoggedIn ,(req, res)=>{
    res.render('join', { title: '회원가입하기'});
});

//신청서 페이지
router.get('/apply',isLoggedIn, (req, res) => {
    res.render('apply', { title: '신청서 입력 페이지'});
});

//메인 페이지
router.get('/', (req, res, next) => {
    res.render('main', { title: '인덱스 페이지'});
});

module.exports = router;