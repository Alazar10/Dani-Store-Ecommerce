import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"


const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginnUser = async (req, res) => {
    try{

        const {email, password} = req.body;

        const user = await userModel.findOne({email})

        if (!user){
            return res.status(400).json({succes:false, message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = createToken(user._id)
            res.status(201).json({success:true, token})
        }
        else{
            res.json({success:false, message:"Invalid Credentials"})
        }


    } catch (error){
        console.log(error)
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }

}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Email validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email address" });
        }

        // Password validation
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ success: false, message: "Password must include at least one uppercase letter (A-Z)" });
        }
        if (!/[a-z]/.test(password)) {
            return res.status(400).json({ success: false, message: "Password must include at least one lowercase letter (a-z)" });
        }
        if (!/\d/.test(password)) {
            return res.status(400).json({ success: false, message: "Password must include at least one number (0-9)" });
        }
        if (!/[@$!%*?&#]/.test(password)) {
            return res.status(400).json({ success: false, message: "Password must include at least one special character (@$!%*?&#)" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        // Generate token
        const token = createToken(user._id);

        res.status(201).json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

const adminLogin = async (req, res) => {
    try {
    const { email, password } = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      )
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid Email or Password' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export { loginnUser, registerUser, adminLogin }