import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUser } from "../store/slices/authSlice";

function ChatHader() {
  const { selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <div className="p-3 border-b bg-gray-200 ring-1 ring-gray-300">
        <div className="flex items-center justify-between">
          {/* User Info */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative w-10 h-10">
              <img
                src={selectedUser?.avatar?.url || "/avatar-holder-avif"}
                alt="/avatar-holder-avif"
                className="w-full h-full object-cover rounded-full"
              />
              {onlineUsers.includes(selectedUser._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-white border-2 rounded-full" />
              )}
            </div>

            {/* Name and Status */}

            <div>
              <h3 className="font-medium text-base text-black"></h3>
              <p className="text-sm text-black">
                {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => dispatch(setOnlineUser(null))}
            className="text-gray-800 hover:text-black transition"
          >
            <X />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatHader;
