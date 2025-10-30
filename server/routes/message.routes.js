import express from "express"
import {getAllUsers,getMessages,sendMessages} from "../controllers/message.controller.js"
import {isAuthenticated} from "../middlewares/auth..middleware.js"


const router=express.Router();

router.get("/users",isAuthenticated,getAllUsers);
router.get("/:id",isAuthenticated,getMessages);
router.post("/:id",isAuthenticated,sendMessages);


export default router