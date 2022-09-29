const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('authorization');
        console.log(token);
        const userid = Number(jwt.verify(token, "db43a197a80ce2990dab5eb45d7bf4b25f3d5d1824d856ed4a186930016e85980d1f94e4944005f0a752e895c8dc6d29bcfcd9d3b60740904c826b40612e1f05"));
        User.findById(userid).then(user => {
            console.log(JSON.stringify(user));
            req.user = user;
            next();
        }).catch(err => { throw new Error(err)})

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
        // err
      }

}

module.exports = {
    authenticate
}