module.exports = (mongoose) => {
    var bookingReq = new mongoose.Schema({
        reference_number: Number,
        coupon_code: Number,
        show_id: Number,
        tickets: [Number]
    })
    const User = mongoose.model(
        "user", mongoose.Schema({
            userid: {
                type: Number,
                require: true
            },
            email: {
                type: String,
                require: true,
                unique: true
            },
            first_name: {
                type: String,
                require: true
            },
            last_name: {
                type: String,
                require: true
            },
            username: {
                type: String,                
            },
            contact: {
                type: Number
            },
            password: {
                type: String,
                require: true
            },
            role: {
                type: String,
                default: "user"
            },
            isLoggedIn: Boolean,
            uuid: String,
            accesstoken: String,
            bookingRequests: [bookingReq],
            coupons: [{
                id: {
                    type: Number,                    
                },
                discountValue: Number
            }],
        }, { timestamps: true })
    );
    return User;
};