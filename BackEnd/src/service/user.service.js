const userModel = require("../model/user.model");

module.exports.signupUser = async ({fullName, email, phone, gender, password}) => {
    if(!fullName || !email || !phone || !gender || !password){
        throw new Error("All fields are required");
    }
    try{
        const user = await userModel.create({
            fullName,
            email,
            phone,
            gender,
            password
        });
        return user;
    }
    catch(error){
        console.log("Error in signupUser Service :",error.message);
    }
}