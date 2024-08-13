import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const validateLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const userExist = await User.findOne({ email })

        // console.log(userExist)

        if (!userExist) {
            return res.status(400).json({ message: "User Not Found" })
        }

        const userValidated = await bcrypt.compare(password, userExist.password)

        console.log(userValidated)

        if (userValidated) {
            return res.status(200).json({
                msg: "Login  Successful", token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                userType: userExist.userType
            });
        }
        else {
            res.status(401).json({ message: "Invalid email or password" })
        }

    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

