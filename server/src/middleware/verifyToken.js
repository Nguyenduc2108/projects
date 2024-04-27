const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req?.headers?.authentication;

    if (!token) {
        return res.status(200).json({
            err: 1,
            msg: "Chưa đăng nhập",
        });
    }

    jwt.verify(token, "vanduc", (err, decode) => {
        if (err) {
            return res.status(200).json({
                err: 2,
                msg: "Token không hợp lệ!",
            });
        }
        req.currentUser = decode;
        next();
    });
};

module.exports = verifyToken;
