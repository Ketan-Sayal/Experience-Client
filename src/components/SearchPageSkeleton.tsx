import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SearchPageSkeleton = () => {
  return (
    <div className='bg-white dark:bg-gray-900 min-h-screen'>
    <div className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-24">
            <div className="w-full grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col gap-2 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="w-full h-48">
                      <Skeleton height="100%" borderRadius="0.5rem" className="block" baseColor="#374151" highlightColor="#4b5563" />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <Skeleton width={100} height={20} baseColor="#374151" highlightColor="#4b5563" />
                      <Skeleton width={40} height={20} baseColor="#374151" highlightColor="#4b5563" />
                    </div>
                    <Skeleton width={80} height={16} baseColor="#374151" highlightColor="#4b5563" />
                    <div className="mt-1">
                      <Skeleton count={2} baseColor="#374151" highlightColor="#4b5563" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
  )
}

export default SearchPageSkeleton
