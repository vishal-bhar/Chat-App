import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { getSocket } from "../lab/socket";
import { Send, X } from "lucide-react";



function MessageInput() {
  const [text,setText]=useState("");
  const [mediaPreview,setMediaPreview]=useState(null);
  const [media,setMedia]=useState(null);
  const [mediaType,setMediaType]=useState("");
  const fileInputRef=useRef(null);

  const dispatch=useDispatch();
  const {selectedUser} =useSelector((state)=>state.chat);

  const handalMediaChange=(e)=>{
    const file=e.target.files[0];;
    if(!file)return;

    setMedia(file);
    const type=file.type;

    if(type.startWith("image/")){
      setMediaType("image");
      const render=new FileReader();
      render.onload=()=>{
        setMediaPreview(render.result);
      };
      render.readAsDataURL(file)
    }else if(type.startWith("video/")){
      setMediaType("video");
      const videoUrl=URL.createObjectURL(file);
      setMediaPreview(videoUrl);
    }else{
      toast.error("please select an image or video file .");
      setMedia(null);
      setMediaPreview(null);
      setMediaType("");
      return;
    }
  };


const removeMedia=()=>{
  setMedia(null);
  setMediaPreview(null);
  setMediaType("")
  if(fileInputRef.current)fileInputRef.current.value="";
};

const handalSendMessage=async (e)=>{
  e.preventDefault();

  if(!text.trim() && !media) return;

  const data=new FormData()
  data.append("text",text.trim());
  data.append("media",media);

  // dispatch(sendMessage(data));

  // Reset All
setText('');
  setMedia(null);
  setMediaPreview(null);
  setMediaType("");
  if(fileInputRef.current) fileInputRef.current.value="";
};


useEffect(()=>{
  const socket=getSocket();

  if(!socket) return;

  const handleNewMessage=(newMessage)=>{
    if(newMessage.senderId===selectedUser._id || newMessage.receiverId===selectedUser._id){
      dispatch({type:"chat/pushNewMessage",payload:newMessage});
    }
  };
  socket.on("newMessage",handleNewMessage);
  return ()=> socket.off("newMessage",handleNewMessage);

},[selectedUser._id]);




  return (
<>
    <div className="p-4 w-full">
      {
        mediaPreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              {mediaType==="image" ? (
                <img src={mediaPreview}
                 alt={mediaPreview}
                 className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                 />)
                 :(
                  <video src={mediaPreview} controls 
                   className="w-32 h-20 object-cover rounded-lg border border-gray-700"
                  />
                 )}

                 <button onClick={removeMedia}
                 type="button"
                 className="absolute -top-2 right-2 w-5 h-5 bg-zing-800 text-white rounded-full flex items-center justify-center hover:bg-black"
                 >
                  <X  className="w-3 h-3"/>
                 </button>
            </div>
          </div>
        )}
        <form onSubmit={handalSendMessage} 
        className="flex items-center gap-2">
          <div className="flex-1 flex gap-2">
            <input 
            type="text"
            accept="image/*,/video/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handalMediaChange}
            />
            <button
            type="button"
            onClick={()=>fileInputRef.current?.click()}
            className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full border-gray-300 hover:border-gray-100 transition 
              ${mediaPreview ? "text-emerald-500" : "text-gray-400"}`}
            >
              <Image size={20} />
            </button>
          </div>
          <button type="submit" 
          className="w-10 h-10 flex items-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          disabled={!text.trim() && !media}
          >
            <Send size={22}/>
          </button>
        </form>
    </div>
</>
  )
}

export default MessageInput