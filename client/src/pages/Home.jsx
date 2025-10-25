

import SideBar from "../components/skeletons/SideBar"; 
import {useSelector} from "react-redux";

const Home=()=> {

  const {selectUser}=useSelector()


  return (
    <>
<div className="min-h-screen bg-gray-100">
  <div className="flex items-center justify-center pt-20 px-4">
    <div className="bg-white rounded-lg shadow-md w-full max-w-6xl h-[calc(100vh-8rem)]">
      <div className="flex h-full rounded-lg overflow-hidden">
        <SideBar />
      </div>
    </div>
  </div>
   </div>
    </>
  )
}

export default Home