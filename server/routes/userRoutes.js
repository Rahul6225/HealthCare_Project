const express = require("express");
const router = express.Router();
const {
    registerUser
    // loginUser
}=require("../controllers/userControllers");
router.post("/" , registerUser);
module.exports=router;