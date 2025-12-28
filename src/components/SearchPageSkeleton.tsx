import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SearchPageSkeleton = () => {
  return (
    <div className='bg-white min-h-screen'>
    <div className="px-24 py-8">
            <div className="grid gap-3 grid-cols-5">
              
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col gap-2 p-2 rounded-lg">
                    {/* Image Placeholder */}
                    <div className="w-full h-48">
                      <Skeleton height="100%" borderRadius="0.5rem" className="block" />
                    </div>
    
                    {/* Title and Price */}
                    <div className="flex justify-between items-center mt-1">
                      <Skeleton width={100} height={20} />
                      <Skeleton width={40} height={20} />
                    </div>
    
                    {/* Place */}
                    <Skeleton width={80} height={16} />
    
                    {/* Description */}
                    <div className="mt-1">
                      <Skeleton count={2} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
  )
}

export default SearchPageSkeleton
