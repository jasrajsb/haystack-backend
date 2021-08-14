const jwt = require('jsonwebtoken');
const User = require('../models/user');
var auth = {};

//creates user object
const create_user = async (req) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const user_obj = {
            ip: ip,
        }
        const user = await User(user_obj).save();
        return user;
    } catch (e) {
        throw e;
    }
}

//gets user object from database
const get_user = async (id, req, res) => {
    try {
        var user = await User.findById(id);
        if (!user) {
            user = await create_user(req);
            user.token = generate(user, res);
        };
        req.user = user;
        return user;
    } catch (e) {
        throw e;
    }
}

//generates auth_token
const generate = (user, response) => {
    var token = jwt.sign(user._id.toString(), process.env.TOKEN_SECRET);
    response.cookie('JWT', token, {
        httpOnly: true
    });
    return token;
}

//decodes the token
const decode = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}

// auth express middleware
auth.middleware = async (req, res, next) => {
    try {
        if (!req.cookies.JWT) {
            var user = await create_user(req);
            user.token = generate(user, res);
            req.user = user;
            next();
        } else {
            req.user = await get_user(decode(req.cookies.JWT), req, res);
            next();
        }
    } catch (e) {
        if (e.message) res.send(e.message);
    }

}

module.exports = auth;