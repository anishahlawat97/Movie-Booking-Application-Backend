module.exports = (app) => {

    const users = require('../controllers/user.controller');
    const router = require('express').Router();
    
    //Login
    router.post("/auth/login", users.login);

    //Register
    router.post("/auth/signup", users.signup);

    //Logout
    router.post("/auth/logout", users.logout);

    //Apply Coupons
    router.get("/auth/coupons", users.getCouponCode);

    //Confirm Booking
    router.post("/auth/bookings", users.bookShow);

    app.use("/api", router);
}