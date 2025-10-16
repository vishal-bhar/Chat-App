import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.js";
import {User} from "../models/user.model.js"
import {Message} from "../models/message.model.js"
import { v2 as cloudinary} from "cloudinary"
import { getReciverSockerId } from "../utils/socket.js";



export const getAllUser=catchAsyncError(async(req,res,next)=>{
    const user=req.user;
    const fileredUser=await User.find({_id:{$ne:user}}).select("-password");
    res.status(200).json({
        success:true,
        fileredUser,
    });
});
export const getMessagesr=catchAsyncError(async(req,res,next)=>{
    const receiverId=req.params.id;
    const myId=req.user._id
    const reciver=await User.findById(receiverId);

    if(!reciver){
        return res.status(400).json({
            success:false,
            message:"Reciver Id invaid .",
        });
    }
    const messages=await Message.find({
        $or:[
            {senderId:myId,receiverId:receiverId},
            {senderId:receiverId,receiverId:myId},
        ],
    }).sort({createdAt:1});

    res.status(200).json({
        success:true,
        messages,
    });
    
});
export const sendMessages=catchAsyncError(async(req,res,next)=>{
    const {text}=req.body;
    const media=req?.files?.media;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;

    const reciver=await User.findById(receiverId);
    if(!reciver){
        return res.status(400).json({
            success:false,
            message:" Reciver ID invalid .",
        });
    }

    const sanitizadText=text?.trim() || ""

    if(!sanitizadText && !media){
        return res.status(400).json({
            success:false,
            message:" cannot send empty message ."
        });
    }

    const mediaUrl="";

    if(media){
        
      try {
          const uploadResponse=await cloudinary.uploader.upload(
            media.tempFilePath,{
                resource_type:"auto",
                folder:"CHAT_APP_MEDIA",
                transformation:[
                    {width:1080,height:1080},
                    {quality:"auto"},
                    {fetch_format:"auto"},
                ],
            }
        );
        mediaUrl=uploadResponse?.secure_url;
      } catch (error) {
        console.error("cloudinary upload faild",error)
        return res.status(400).json({
            success:false,
            message:"failed to upload the media ! please try later"
        });
      }
    }

    const newMessage=await Message.create({
        senderId,
        receiverId,
        text:sanitizadText,
        media:mediaUrl
    });

    const reciverSocketId=getReciverSockerId(receiverId)
    if(reciverSocketId){
        io.to(reciverSocketId).emit("newMessage",newMessage);
    }

    res.status(201).json(newMessage);

});
