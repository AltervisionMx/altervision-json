const { Router } = require('express');
const router = Router();
const sponsors = require("../sponsors.js");
const passport = require('passport');

// 1 => Serializacion
passport.serializeUser(function(user, done) {
    done(null, user.id);
})

// Desserializacion
passport.deserializeUser(function(id, done) {
    done(null, {id: 1, name: "altervision"});
})

router.get("/", (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login");
}, (req, res) => {
    // iniciar sesion o redireccionar a login
    res.render("index")
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login"
}));

router.get("/carousel_mayoralty", function(req, res) {
    res.send(sponsors.mayoraltySponsors())
});

router.get("/carousel_sponsors", function(req, res) {
    res.send(sponsors.carouselSponsors())
});

module.exports = router