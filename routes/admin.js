const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../models/user");
const Apply = require('../models/apply');
const Reserve = require('../models/interview');

const router = express.Router();

async function token_verify(token) {
    const url = "https://nas.ivis.dev/remote_token_verify/";
    let formData = new FormData();
    formData.append('token', token);
    const options = {
        method: 'POST',
        body: formData
    }

    let tmp = false;

    await fetch(url, options)
        .then(res => {
            if (res.status === 200) {
                console.log("Token Verified");
                tmp = true;
            }
        })
        .catch(err => {
            console.error(err);
        })
    return tmp;
}

// every method need to be verified first, if not, return 403
router.get('/users', async (req, res) => {
    try {
        let token_res = await token_verify(req.headers.authorization);
        if (token_res === false) {
            throw new Error("Token Verify Failed");
        } else {
            const users = await User.findAll({
                attributes: ['sid', 'name', 'phone', 'approved']
            });
            const result = [];
            for (let i = 0; i < users.length; i++) {
                const apply = await Apply.findOne({
                    where: {
                        sid: users[i].sid
                    }
                });
                let apply_status = false;
                if (apply) {
                    apply_status = true;
                }
                result[i] = {
                    sid: users[i].sid,
                    name: users[i].name,
                    phone: users[i].phone,
                    approved: users[i].approved,
                    applied: apply_status
                }
            }
            res.send({
                "result": result
            });
        }

    }
    catch (err) {
        console.error(err);
        return res.status(400);
    }
});

//get /applicaton/:sid
router.get('/application/:sid', async (req, res) => {
    try {
        let token_res = await token_verify(req.headers.authorization);
        if (token_res === false) {
            throw new Error("Token Verify Failed");
        } else {
            const apply = await Apply.findOne({
                where: {
                    sid: req.params.sid
                }
            });
            if (apply) {
                res.send({
                    "result": apply
                });
            }
            else {
                res.status(404).send({
                    "error": "Not Found"
                });
            }
        }
    }
    catch (err) {
        console.error(err);
        return res.status(400);
    }
});

router.get('/interview', async (req, res) => {
    try {
        let token_res = await token_verify(req.headers.authorization);
        if (token_res === false) {
            throw new Error("Token Verify Failed");
        } else {
            const reserves = await Reserve.findAll({
                attributes: ['sid', 'day', 'time', 'reserved'],
            });
            const result = {
                "sat": [],
                "sun": []
            };
            for (let i = 0; i < reserves.length; i++) {
                if (reserves[i].reserved) {
                    if (reserves[i].day === 'sat') {
                        result.sat.push({
                            "time": reserves[i].time,
                            "sid": reserves[i].sid
                        });
                    } else {
                        result.sun.push({
                            "time": reserves[i].time,
                            "sid": reserves[i].sid
                        });
                    }
                }
            }
            res.send({
                "result": result
            });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(400);
    }
});

router.get('/user/:sid', async (req, res) => {
    try {
        let token_res = await token_verify(req.headers.authorization);
        if (token_res === false) {
            throw new Error("Token Verify Failed");
        } else {
            const user = await User.findOne({
                where: {
                    sid: req.params.sid
                }
            });
            const result = {
                "name": user.name,
                "phone": user.phone,
            }
            res.send({
                "result": result
            });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(400);
    }
});

module.exports = router;

