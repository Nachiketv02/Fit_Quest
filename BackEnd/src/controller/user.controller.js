const userModel = require("../model/user.model");
const userService = require("../service/user.service");

module.exports.signupUser = async (req, res) => {
    try{
        const {fullName, email, phone, gender, password} = req.body;
        if(!fullName || !email || !phone || !gender || !password){
            res.status(400).json({ error: "All fields are required" });
            return;
        }
        const existingUser = await userModel.findOne({ 
            $or: [
                { email },
                { phone }
            ]
        });
        if(existingUser){
            res.status(400).json({ error: "User already exists" });
            return;
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.signupUser({
            fullName,
            email,
            phone,
            gender,
            password: hashedPassword
        });

        const token = user.generateAuthToken();
        res.cookie("token", token);

        res.status(201).json({ message: "User created successfully" , user});
    }
    catch(error){
        console.log("Error in signupUser Controller :",error.message);
        res.status(500).json({ error: error.message });
    }
}