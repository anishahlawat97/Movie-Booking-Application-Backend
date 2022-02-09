const db = require('../models');
const User = db.user;
const { btoau, atobu } = require('b2a');
const TokenGenerator = require('uuid-token-generator');
const { uuid } = require('uuidv4');

exports.signup = (req, res) => {

    //Validate request
    if (!req.body.email_address || !req.body.password || !req.body.last_name) {
        res.status(400).send({
            message: "Please provide email, password, first name and last name"
        });
        return;
    }

    const filter = { email: req.body.email_address };

    User.findOne(filter, (err, userData) => {
        if (err || userData !== null) {
            res.status(400).send({
                message: "User Already Exists."
            })
        }
        else {
            const hash = btoau(req.body.password);
            const _uuid = uuid();
            const user = new User({
                userid: Math.random(),
                email: req.body.email_address,
                first_name: req.body.first_name,
                last_name: req.body.last_name ? req.body.last_name : "",
                username: req.body.first_name + req.body.last_name,
                contact: req.body.mobile_number,
                password: hash,
                role: req.body.role ? req.body.role : 'user',
                isLoggedIn: true,
                uuid: _uuid,
                coupons: [{ id: 101, discountValue: 100 }, { id: 102, discountValue: 50 }],

            });
            user.save(user)
                .then(data => {
                    res.status(200).send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: "Some error occured, please try again later"
                    })
                })
        }
    })
}

exports.login = (req, res) => {
    
    var usernamePassword = req.headers.authorization.split(" ")[1];
    usernamePassword = atobu(usernamePassword);
    const username = usernamePassword.split(":")[0];
    const password = usernamePassword.split(":")[1];
    console.log(username, password);
    

    //Validate Request    
    if (!username && !password) {
        res.status(400).send({
            message: "Please provide username and password to continue"
        });
        return;
    }

    const filter = { username: username };
    User.findOne(filter, (err, userData) => {
        if (err || userData == null) {
            res.status(401).send({
                message: "Username or Password is Incorrect",
            })
        }
        else {
            const passW = atobu(userData.password);
            if (password === passW) {
                userData.isLoggedIn = true;
                const tokGen = new TokenGenerator(256, TokenGenerator.BASE62);
                const token = tokGen.generate();
                userData.accesstoken = token;
                User.findOneAndUpdate(filter, userData)
                    .then(
                        data => {
                            data.accesstoken = token;
                            res.json(
                                data
                            );
                        }
                    ).catch(err => {
                        res.status(500).send({
                            message: "Error updating..."
                        });
                    });
            }
            else {
                res.status(401).send({
                    message: "Password is Incorrect",
                })
            }
        }
    })
}

exports.logout = (req, res) => {
    if (!req.body.uuid) {
        res.status(400).send({
            message: "Please provide user ID",
        });
        return;
    }
    const update = { isLoggedIn: false, accesstoken: "" };
    User.findOneAndUpdate({ uuid: req.body.uuid }, update)
        .then(
            data => {
                res.json({
                    user: data,
                    message: "Logged Out successfully.",
                })
            }
        ).catch(err => {
            res.status(500).send({
                message: "Error updating..."
            });
        });
}

exports.getCouponCode = (req, res) => {
    if (!req.query.code) {
        res.status(404).send({
            message: "Invalid Coupon Code"
        });
        return;
    }
    const token = req.headers.authorization.split(" ")[1];   
    User.findOne({ accesstoken: token }, {coupons: {$elemMatch: { id: req.query.code }} }, { "coupons": 1 })
        .then(
            data => {
                res.json({
                    discountValue: data.coupons[0].discountValue,
                    message: "Coupon Applied",
                })
            }
        ).catch(err => {
            res.status(500).send({
                message: "Invalid Code"
            });
        });
}

exports.bookShow = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const update = { $push: { bookingRequests: req.body.bookingRequest } }
    User.findOneAndUpdate({ accesstoken: token }, update)
        .then(
            data => {
                res.json({
                    user: data,
                    message: "Booking Confirmed and Updated",
                })
            }
        ).catch(err => {
            res.status(500).send({
                message: "Error updating..."
            });
        });
}