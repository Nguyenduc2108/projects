const router = require("express").Router();
const passport = require("passport");
require("dotenv").config();
const authController = require("../controllers/authController");
const authService = require("../services/authService");

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);

router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", (err, profile) => {
            req.user = profile;
            next();
        })(req, res, next);
    },
    (req, res) => {
        res.redirect(
            `${process.env.URL_CLIENT}/login-success/${req.user?.id}/${req.user.tokenLogin}`
        );
    }
);

router.post("/login-success", authController.loginSuccess);

router.post("/register", async (req, res) => {
    const result = await authService.register(req.body);
    res.send(result);
});

module.exports = router;
