import userModel from "./../models/userModel.js"
import { comparePassword, hashPassword } from "./../helpers/authHelper.js"
import JWT from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body

        if (!name) {
            return res.send({ message: 'Name is required' })
        }

        if (!email) {
            return res.send({ message: 'Email is required' })
        }

        if (!password) {
            return res.send({ message: 'Password is required' })
        }

        if (!phone) {
            return res.send({ message: 'Phone number is required' })
        }

        if (!address) {
            return res.send({ message: 'Address is required' })
        }

        const exisitingUSer = userModel.findOne({ email });


        const hashedPassword = await hashPassword(password);

        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User registration successful",
            user,
        });

        if (exisitingUSer) {
            return res.status(200).send({
                success: false,
                message: 'Already registered Please Login',
            });
        }

    } catch (message) {
        console.log(message);
        res.status(500).send({
            success: false,
            message: 'message in Registration',
            message
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered',
            })
        }

        const match = await comparePassword(password, user.password)

        if (!match) {
            return res.status(404).send({
                success: false,
                message: 'Invalid password'
            })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).send({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            }, token
        })

    } catch (message) {
        console.log(message);
        res.status(500).send({
            success: false,
            message: 'message in Login',
            message,
        })
    }
}


export const testController = (req, res) => {
    res.status(200).send({
        success: true,
        message: 'test done',
    })
}