const express = require('express');
const Apply = require("../models/apply");

const router = express.Router();

router.post('/',async(req, res, next) => {
    const { sid, intro, language, etclang, project, languagePlan, projectPlan} = req.body;
    try {
        const appliedUser = await Apply.findOne({ where:{ sid }})
        if(appliedUser){
            return res.send('이미 신청하셨습니다. 이제와 무를 순 없다 애송이')
        }
        await Apply.create({
            sid,
            intro,
            language,
            etclang,
            project,
            languagePlan,
            projectPlan
        });
        return res.status(200).send({
            "result":true
        });
    } catch (error) {
        console.error(error);
        return res.send({
            "result":false
        });
    }
});

module.exports = router;