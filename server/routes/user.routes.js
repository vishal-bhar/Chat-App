import express from "express";
import { getUser,signin,signout,signup,updateProfile } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth..middleware.js";

const router=express.Router();

router.post("/sign-up",signup);
router.post("/sign-in",signin);
router.get("/sign-out",isAuthenticated,signout);
router.get("/me",isAuthenticated,getUser);
router.put("/update-profile",isAuthenticated,updateProfile)


export default router;