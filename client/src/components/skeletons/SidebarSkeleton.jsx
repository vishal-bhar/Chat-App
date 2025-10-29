import { User } from "lucide-react";

function SidebarSkeleton() {


  const skeletonContacts=Array(8).fill(null);

  return (
    <>
    <aside className='h-full w-20 lg:w-72 border-r border-gray-200 flex flex-col transition-all duration-200'>
      {/* Header */}
      <div className="border-b border-gray-200 2-full p-5">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-gray-700" />
            <span className="font-medium hidden lg:block text-gray-800">
              Contact
            </span>
          </div>
          </div>
          

    {/* Skeletion contact */}

    <div className='overflow-y-auto w-full py-3'>
      {
        skeletonContacts.map((_,index)=>{
          return (
            <div key={index} className='w-full p-3 flex items-center gap-3 animate-pulse'>
              {/* Avatar Skeleton */}
              <div className='relative mx-auto lg:mx-0'>
                <div className='w-12 h-12 bg-gray-300 rounded-full' /> 
              </div>

              {/* Text skeleton for large screen only */}

              <div className='hidden lg:flex flex-col gap-2 flex-1'>
                <div className='h-4 w-32 bg-gray-300 rounded' />
                <div className='h-4 w-32 bg-gray-300 rounded' />
                <div className='h-4 w-32 bg-gray-300 rounded' />
              </div>
            </div>
          );
        })
      }
    </div>

    </aside>
    </>
  )
}

export default SidebarSkeleton