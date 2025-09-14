const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res){

    const {fullname , email , password}= req.body;
     
    const isUserAlreadyExists = await userModel.findOne({email:email});

    if(isUserAlreadyExists){
        return res.status(400).json({
            message : "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        fullname,
        email,
        password : hashedPassword
    })
   const token = jwt.sign({
    id : user._id}, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
        message : "user registered successfully" , 
        user : {
            _id : user._id,
            email : user.email,
            fullName : user.fullname
        }
    })

}


async function loginUser(req, res){
    const {email , password} = req.body;

    const user= await userModel.findOne({email:email});

    if(!user){
        return res.status(404).json({
            message : "User not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({
            message : "Invalid password"
        })
    }
   
    const token = jwt.sign({
        id : user._id,
    },process.env.JWT_SECRET);

    res.cookie("toekn" , token);

    res.status(200).json({
         message : "user logged in successfully" , 
         user : {
            _id : user._id,
            email : user.email,
            fullName : user.fullname
        }
    })
}


function logoutUser(req , res){
res.clearCookie("token");
res.status(200).json({
    message : "user logged out succesfully"
});
}

async function registerFoodPartner(req, res){
   const {name, email, password, phone, address , contactName} = req.body;
    const isFoodPartnerAlreadyExists = await foodPartnerModel.findOne({email:email});
    if(isFoodPartnerAlreadyExists){
        return res.status(400).json({
            message : "Food Partner already exists"
        })
    }
     
    const hashedPassword = await bcrypt.hash(password,10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password : hashedPassword,
        phone,
        address,
        contactName
    })
    
    const token = jwt.sign({
    id : foodPartner._id}, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
        message : "Food Partner registered successfully" ,
        foodPartner : {
            _id : foodPartner._id,
            email : foodPartner.email,
            name : foodPartner.name,
            phone : foodPartner.phone,
            address : foodPartner.address,
            contactName : foodPartner.contactName
        }
    })
}

async function loginFoodPartner(req, res){

    const {email, password} = req.body;

    const foodPartner = await foodPartnerModel.findOne({email:email});

    if(!foodPartner){
        return res.satus(404).json({
            message : "Food Partner not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if(!isPasswordValid){
    return res.status(404).json({
        message : "Invalid password"
    })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET);
    res.cookie("token",token);
    res.status(200).json({
        message : "Food Partner logged in successfully",
        foodPartner:{
            _id : foodPartner._id,
            email: foodPartner.email,
            name : foodPartner.name
        }
    })
}

function logoutFoodPartner(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message : "Food Partner logged out successfully"
    })
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}              
   
