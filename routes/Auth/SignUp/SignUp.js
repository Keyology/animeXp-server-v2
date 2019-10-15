const User = require("../models/user");
const shortId = require("shortid");
const bcrypt = require("bcryptjs");
const validate = require("../../common/validator");
const JWT = require('jsonwebtoken');


getIdFromJWTToken = function(token) {
    return await JWT.verify(token, process.env.SECRECT, {algorithm: "HS256"}, (error,decode) =>{
        let id = null;
        let newUser = false;
        const expired = (error && error.message == "jwt expired")
        if (!error && !expired) id = decode['_id']
        if (expired) {
            newUser = true
            id = shortId.generate();
        }
        return (newUser, id)
    });
}


signUpLogic = function(data) {
    let successfullySignedUp = false;
    let jwtToken = null;
    let newUser = false;
    let userId = null;


    try {
        if (data.token) {
            newUser, userId = getIdFromJWTToken(data.token);
        } else {
            userId = shortId.generate();
        }
    
        if (userId) {
            let user = null;
            let userDataObject = {
                userId: userId,
                userEmail: data.email, 
                password: await bcrypt.hash(data.password, 10),
                isSignedUp: true,
            }
            if (data.hasPhoneNumber) {
                userDataObject.phoneNumber = data.phoneNumber
            }
            if (newUser) {
                user = await User.findOneAndUpdate(
                    { userId: userId},
                    userDataObject
                );
            } else {  
                user = new User(userDataObject)
            }
            const saveUserToDb = await user.save();
            const jwtToken = JWT.sign(
                {_id:userId},
                process.env.SECRECT,
                {algorithm: 'HS256'},
                {expiresIn: "30 days"}
            );
            successfullySignedUp = true
        }
    } catch (exception) {
        console.log("Exception:", exception)
    }

    return (successfullySignedUp, jwtToken)
    
}

signUpImplicitLogic = function() {
    let successfullySignedUp = false;
    let jwtToken = null;
    try {
        const userId = shortId.generate();
        const saveUserToDb = new User({userId: userId}).save
        const jwtToken = JWT.sign(
            {_id:userId},
            process.env.SECRECT,
            {algorithm: 'HS256'},
            {expiresIn: "24 hours"}
        );
        successfullySignedUp = true
    } catch (exception) {
        console.log("Exception:", exception)
    }
    return (successfullySignedUp, jwtToken)
}

bodyValid = function() {
    const validEmail = await validate.validateEmail(body.email);
    const validPassword = await validate.validatePassword(body.password);
    const validPhoneNumber = await validate.validatePhoneNumber(body.phoneNumber);
    const validCarrier = await validate.validateCarrier(body.carrier);
    let errorMessage = null;
    if (!validEmail || !validPassword) {
        errorMessage = (
            !validEmail && !validPassword ? 'Invalid email and password' : (
                !validEmail ? 'Invalid email': 'Invalid password'
            )
        )
    } else if (hasPhoneNumber === true) {
        if (!validPhoneNumber || !validCarrier) {
            errorMessage = (
                !validPhoneNumber && !validCarrier ? 'Invalid phone number and carrier' : (
                    !validPhoneNumber ? 'Invalid phone number': 'Invalid carrier'
                )
            )
        }
    }
    return errorMessage
}

exports.signupImplicit = async function(req, res) {
    let successfullySignedUp, jwtToken = signUpLogic(body)
    if (successfullySignedUp) {
        return res.json({"token": jwtToken}).status(200)
    } else {
        return res.status(503).send({'message': "Error signing up user"});
    }
    
    
}

exports.signup = async function(req, res) {
    const body = {
        "email": req.body.email, 
        "password": req.body.password,
        "userId": req.body.user_id,
        "hasPhoneNumber": req.body.has_phone_number,
        "carrier": req.body.carrier, 
        "phoneNumber": req.body.phone_number,
        "token": req.body.token
    };
    let successfullySignedUp = false;
    let jwtToken = null;
    let errorMessage = bodyValid;
    if (errorMessage) return res.status(412).send({'message': errorMessage});
    successfullySignedUp, jwtToken = signUpLogic(body)

    if (successfullySignedUp) {
        return res.json({"token": jwtToken}).status(200)
    } else {
        return res.status(503).send({'message': "Error signing up user"});
    }
    
    
}