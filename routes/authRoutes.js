import express from "express";
import { loginController, registerController, testController } from "../controller/authController.js"
import { isAdmin, requireSingIn } from "../middlewares/authMiddelWare.js";

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.get('/test', requireSingIn, isAdmin, testController);

router.get("/user-auth", requireSingIn, (req, res) => {
    res.status(200).send({ ok: true });
})

export default router;