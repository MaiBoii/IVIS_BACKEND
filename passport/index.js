const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.sid);
    });

    passport.deserializeUser((sid, done) => {
        User.findOne( { where: { sid } } ) 
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();``
}