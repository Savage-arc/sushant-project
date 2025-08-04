
const User = require('../model/createusermodel');
const bcrypt = require('bcrypt');

require("dotenv").config();
const jwt = require('jsonwebtoken');

const createuser = async (req, res) => {
    console.log(req.body)
    console.log(req.files?.length ? req.files[0].path:null)
    
    try {
        const { username, address, email, age, password } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: "User already exists with this email" });
        }
        const image = req.files?.length ? req.files[0].path:null

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await User.create({ name: username, address, email, age: parseInt(age), password: hashedPassword, Image: image });
        return res.status(201).json({success:true, message:"user created",newUser});
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getallusers = async (req, res) => {
    try {
        const users = await User.findAll({attributes:{ exclude: ['password'] }});
        res.json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// const updateuser = async (req, res) => {
//     const userid = req.params.id;
//     try{
//         const userexists = user.findByPk(userid);
//         if (!userexists) {
//             console.log("user exists");
//             const { username, address, email, password } = req.body;
//             const updatedUser = await user.update(
//                 { username, address, email, password },
//                 { where: { id: userid } }
//             );
//             return res.status(200).json(updatedUser);           

//         }
//         else {
//             return res.json({ error: "User not found" });
//         }
//         catch (error) {
//             return res.status(400).json({ error: "Internal Server Error" });
//         }
// };
const updateuser = async (req, res) => {
    const userid = req.params.id;
    try {
        const userexists = await User.findByPk(userid);
        if (userexists) {
            const { username, address, email, age, password } = req.body;
            const image = req.files?.length ? req.files[0].path : null;
            const updatedUser = await User.update(
                { name: username, address, email, age: age ? parseInt(age) : null, password, Image: image },
                { where: { id: userid } }
            );
            return res.status(200).json(updatedUser);
        } else {
            return res.json({ error: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateuserbyself = async (req, res) => {
    const userid = req.user.id; // Assuming user ID is stored in req.user.id after authentication
    try {
        const userexists = await User.findByPk(userid);
        if (userexists) {
            const { username, address, email, age, password } = req.body;

            const image = req.files?.length ? req.files[0].path : null;

            let newpassword = userexists.password;
            if (password){
                const salt = await bcrypt.genSalt(10);
                newpassword = await bcrypt.hash(password,salt);
            }
            
            const updatedUser = await User.update(
                { name: username, address, email, age: age ? parseInt(age) : null, password: newpassword, Image: image },
                { where: { id: userid } }
            );
            return res.status(200).json(updatedUser);
        } else {
            return res.json({ error: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


const getuserbyid = async (req, res) => {
    const userid = req.params.id;
    try {
        const userexists = await User.findByPk(userid, { attributes: { exclude: ['password'] } });
        if (userexists) {
            return res.status(200).json(userexists);
        } else {
            return res.json({ error: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteuser = async (req, res) => {
    const userid = req.params.id;
    try {
        const userexists = await User.findByPk(userid);
        if (userexists) {
            await User.destroy({
                where: { id: userid }
            });
            res.json({ 
                success: true, 
                message: "user deleted" });
        } else {
            return res.json({ success:false, message:"User not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}




module.exports = {
    createuser,
    getallusers,
    updateuser,
    deleteuser,
    getuserbyid,
    updateuserbyself
};
