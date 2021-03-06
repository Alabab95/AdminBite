const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    req._id = decoded._id;
                    req.role = decoded.role;
                    req.email = decoded.email;
                    console.log(req._id);
                    console.log(req.role);
                    next();
                }
            }
        )
    }
}
module.exports.cheackRole = roles =>(req,res,next) => {
    if (roles.includes(req.role)){
        next();
    }else {
        return res.status(401).json({
            message : "Unauthorize",
            success : false
        });
    }
}
