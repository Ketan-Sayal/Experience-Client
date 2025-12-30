import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SearchPageSkeleton = () => {
  return (
    <div className='bg-white min-h-screen'>
    <div className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-24">
            <div className="w-full grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              
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
