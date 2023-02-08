const express = require('express');
const Apply = require("../models/apply");

const router = express.Router();

router.post('/apply',async(req, res, next) => {
    const { studentID, intro, language, etclang, project, languagePlan, projectPlan} = req.body;
    try {
        const exUser = await Apply.findAll({ where: { studentID }});
        if(exUser){
            return res.send('이미 신청하셨습니다. 이제와 무를 순 없다 애송이')
        }
        await Apply.create({
            studentID,
            intro,
            language,
            etclang,
            project,
            languagePlan,
            projectPlan
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;