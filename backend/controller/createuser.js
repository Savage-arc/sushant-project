const User = require('../model/createusermodel');
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
  try {
    const { name, email, age, address, password } = req.body;

    if (!name || !email || !age || !address || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ 
      name, 
      email, 
      age, 
      address, 
      password: hashedPassword 
    });
    
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ error: error.message });
  }
};