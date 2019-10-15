const User = require("../models/user");
const shortId = require("shortid");
const bcrypt = require("bcryptjs");
const validate = require("../../common/validator");
const JWT = require('jsonwebtoken');


signInLogic = function(data) {
    let successfullySignedIn = false;
    let jwtToken = null;

    const user = await User.findOne({email: data.email});
    if (user !== null) {
        successfullySignedIn, jwtToken = bcrypt.compare(data.password, user.password, (err, result) =>{
            const correct = false;
            const token = null;
            if (!err) {
                const token = JWT.sign(
                    {_id:findUser._id},
                    process.env.SECRECT,
                    {algorithm: 'HS256'},
                    {expiresIn: "30 days"}
                );
            }
            return correct, token
        });
    }
    return (successfullySignedIn, jwtToken)
}

bodyValid = function() {
    const validEmail = await validate.validateEmail(body.email);
    const validPassword = await validate.validatePassword(body.password);
    let errorMessage = null;
    if (!validEmail || !validPassword) {
        errorMessage = (
            !validEmail && !validPassword ? 'Invalid email and password' : (
                !validEmail ? 'Invalid email': 'Invalid password'
            )
        )
    }
    return errorMessage
}

exports.signIn = async function(req, res) {
    const body = {
        "email": req.body.email, 
        "password": req.body.password
    };
    let successfullySignedIn = false;
    let jwtToken = null;
    let errorMessage = bodyValid;
    if (errorMessage) return res.status(412).send({'message': errorMessage});
    successfullySignedIn, jwtToken = signInLogic(body)

    if (successfullySignedIn) {
        return res.json({"token": jwtToken}).status(200)
    } else {
        return res.status(503).send({'message': "Error signing-in user"});
    }
    
    
}