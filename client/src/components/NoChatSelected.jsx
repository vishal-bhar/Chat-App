

import {MessageSquare} from "lucide-react" 

function NoChatSelected() {



  return (
  <>
  <div className="w-full flex flex-col items-center justify-center p-16 bg-white/50">
  <div className="max-w-md text-center space-y-6">
    {/* Icon Display */}
    <div className="flex justify-center gap-4 mb-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center animate-bounce">
          <MessageSquare />
        </div>
      </div>
    </div>

    {/* Welcome text */}

    <h2 className="text-2xl font-bold text-gray-800">
      Welcome to Talkie
    </h2>
    <p className="text-gray-500">Select a conversation from sidebar to start chatting</p>

  </div>
  </div>
  </>)
}

export default NoChatSelected