module.exports = (app) => {

    const users = require('../controllers/user.controller');
    const router = require('express').Router();
    
    router.post("/auth/login", users.login);

    router.post("/auth/signup", users.signup);

    router.post("/auth/logout", users.logout);

    router.get("/auth/coupons", users.getCouponCode);

    router.post("/auth/bookings", users.bookShow);

    app.use("/api", router);
}