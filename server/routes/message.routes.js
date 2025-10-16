import express from "express"
import {getAllUser,getMessagesr,sendMessages} from "../controllers/message.controller.js"
import {isAuthenticated} from "../middlewares/auth..middleware.js"


const router=express.Router();

router.get("/users",isAuthenticated,getAllUser);
router.get("/:id",isAuthenticated,getMessagesr);
router.post("/:id",isAuthenticated,sendMessages);


export default router