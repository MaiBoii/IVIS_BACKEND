const express = require('express');
const Apply = require("../models/apply");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
	try {
		const sid = req.user.sid;
		const { intro, language, project, etc } = req.body;
		const appliedUser = await Apply.findOne({ where: { sid: sid } })
		if (appliedUser) {
			return res.send(appliedUser).status(200);
		}
		console.log(sid, intro, language, project, etc);
		await Apply.create({
			sid: sid,
			intro: intro,
			language: language,
			project: project,
			etc: etc
		});
		return res.status(200).send({
			"result": true
		});
	} catch (error) {
		console.error(error);
		return res.send({
			"result": false
		}).status(404);
	}
});

module.exports = router;
