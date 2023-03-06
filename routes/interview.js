const express = require('express');
const Reserve = require("../models/interview");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.get('/init', async (req, res) => {
    try {
        const day = ["sat", "sun"];
        const time = ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45"];
        for (let i = 0; i < day.length; i++) {
            for (let j = 0; j < time.length; j++) {
                await Reserve.create({
                    day: day[i],
                    time: time[j],
                    reserved: false,
                    sid: null
                });
            }
        }
        res.send({
            "result": true
        });
    } catch (error) {
        console.error(error);
        return res.send({
            "result": false
        }).status(400);
    }
});

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const sid = req.user.sid;
        console.log(sid);
        const reserve = await Reserve.findOne({
            where: {
                sid: sid
            }
        });
        if (reserve) {
            res.send({
                "result": {
                    "check": true,
                    "day": reserve.day,
                    "time": reserve.time
                }
            });
        } else {
            // read all data from reserves table, day, time, reserved order by id
            const reserves = await Reserve.findAll({
                attributes: ['day', 'time', 'reserved'],
                order: [['id', 'ASC']]
            });
            const result = {
                "check": false,
                "sat": [],
                "sun": []
            };
            for (let i = 0; i < reserves.length; i++) {
                if (reserves[i].day === 'sat') {
                    result.sat.push({
                        "time": reserves[i].time,
                        "reserved": reserves[i].reserved
                    });
                } else {
                    result.sun.push({
                        "time": reserves[i].time,
                        "reserved": reserves[i].reserved
                    });
                }
            }
            res.send({
                "result": result
            });
        }
    } catch (error) {
        console.error(error);
        return res.send({
            "result": false
        }).status(400);
    }
});

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const sid = req.user.sid;
        const { day, time } = req.body;
        const reserve = await Reserve.findOne({
            where: {
                day: day,
                time: time
            }
        });
        if (reserve.reserved) {
            res.send({
                "result": false
            });
        } else {
            Reserve.update({
                reserved: true,
                sid: sid
            }, {
                where: {
                    day: day,
                    time: time,
                }
            })
                .then(() => {
                    res.send({
                        "result": true
                    });
                });
        }
    } catch (error) {
        console.error(error);
        return res.send({
            "result": false
        }).status(400);
    }
});

module.exports = router;