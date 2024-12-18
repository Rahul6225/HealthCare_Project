const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Corrected variable name to 'User'
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber, password } = req.body;

    // Validate all required fields
    if (!firstName || !lastName || !age || !gender || !bloodGroup || !email || !phoneNumber || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
        firstName,
        lastName,
        age,
        gender,
        bloodGroup,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
});

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("please fill all fields");
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const passwordMatch  = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        return res.status(400).json({message:"password did not match"});
    } 
    
    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            bloodGroup: user.bloodGroup,
            age: user.age,
            gender: user.gender,
        },
    });
})
const getUserProfile = asyncHandler(async(req,res)=>{
    try{
        const email = req.body;
        const data = await User.findOne(email);
        if(!data) return res.status(401).json({err});
         return res.status(200).json({data});
    }
    catch{
        return res.status(500).json({err});
    }

});
const updateuserProfile = asyncHandler(async(req,res)=>{
    try{
        const {username,email,phoneNum} = req.body;
        const userId = req.user.id;
        const updateuser = await user.findByIdAndUpdate(
            userId,{
                username,
                email,
                password
            },{new:true,runValidator:true}

        ).select("password");
        if(!updateuser) return res.status(404).json({message:"User not found"});
        return res.status(200).json({message:"User Update Successfully",user:updateuser});
}
    catch{
        return res.status(500).json({message:"Server Error"});
    }
        

});
module.exports = { registerUser , loginUser};