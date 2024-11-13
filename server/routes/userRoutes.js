const express = require("express");
const jwtmiddleware = require("./")
const router = express.Router();
const {
    registerUser,
    loginUser
}=require("../controllers/userControllers");
router.post("/" , registerUser);
router.post("/login", loginUser);

//Get the route for specific data
router.get("/myaccount",getUserProfile)

//updatethe route for specific data for partials Changes
router.patch("/myaccount",updateuserProfile);
module.exports=router;