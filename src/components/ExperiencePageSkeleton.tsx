import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ExperiencePageSkeleton = () => {
  return (
    <div className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-24 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton circle width={24} height={24} baseColor="#374151" highlightColor="#4b5563" />
        <Skeleton width={60} height={16} baseColor="#374151" highlightColor="#4b5563" />
      </div>
      <div className="flex flex-col md:flex-row gap-7 pt-4 w-full">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 md:hidden w-full md:w-[50%] flex flex-col gap-3 rounded-lg h-fit border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <Skeleton width={80} baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={50} baseColor="#374151" highlightColor="#4b5563" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton width={60} baseColor="#374151" highlightColor="#4b5563" />
            <div className="flex gap-1 items-center">
              <Skeleton width={32} height={32} borderRadius={4} baseColor="#374151" highlightColor="#4b5563" /> {/* Plus Button */}
              <div className="w-4 text-center"><Skeleton width={10} baseColor="#374151" highlightColor="#4b5563" /></div>
              <Skeleton width={32} height={32} borderRadius={4} baseColor="#374151" highlightColor="#4b5563" /> {/* Minus Button */}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Skeleton width={60} baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={50} baseColor="#374151" highlightColor="#4b5563" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <Skeleton width={40} baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={30} baseColor="#374151" highlightColor="#4b5563" />
          </div>
          <hr className="border-gray-200 dark:border-gray-600" />
          <div className="flex justify-between py-3 items-center">
            <Skeleton width={50} height={24} baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={60} height={24} baseColor="#374151" highlightColor="#4b5563" />
          </div>
          <Skeleton height={40} borderRadius="0.375rem" baseColor="#374151" highlightColor="#4b5563" />
        </div>
        <div className="w-[109%] h-[300px]">
          <Skeleton 
            className="w-full h-full" 
            height="100%" 
            borderRadius="0.5rem"
            baseColor="#374151" 
            highlightColor="#4b5563"
          />
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 hidden w-[50%] md:flex flex-col gap-3 rounded-lg h-fit border border-gray-200 dark:border-gray-700">
          {/* Price Row */}
          <div className="flex justify-between items-center">
            <Skeleton width={80} baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={50} baseColor="#374151" highlightColor="#4b5563" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton width={60} baseColor="#374151" highlightColor="#4b5563" />
            <div className="flex gap-1 items-center">
              <Skeleton width={32} height={32} borderRadius={4} baseColor="#374151" highlightColor="#4b5563" /> {/* Plus Button */}
              <div className="w-4 text-center"><Skeleton width={10} baseColor="#374151" highlightColor="#4b5563" /></div>
              <Skeleton width={32} height={32} borderRadius={4} baseColor="#374151" highlightColor="#4b5563" /> {/* Minus Button */}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Skeleton width={60} baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={50} baseColor="#374151" highlightColor="#4b5563" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <Skeleton width={40} baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={30} baseColor="#374151" highlightColor="#4b5563" />
          </div>
          <hr className="border-gray-200 dark:border-gray-600" />
          <div className="flex justify-between py-3 items-center">
            <Skeleton width={50} height={24} baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={60} height={24} baseColor="#374151" highlightColor="#4b5563" />
          </div>
          <Skeleton height={40} borderRadius="0.375rem" baseColor="#374151" highlightColor="#4b5563" />
        </div>
      </div>
      <div className="pt-4 flex flex-col gap-3 w-full md:w-[67%]">
        <Skeleton width={150} height={28} baseColor="#374151" highlightColor="#4b5563" />
        <Skeleton count={3} baseColor="#374151" highlightColor="#4b5563" />
        <div className="pt-2 flex flex-col gap-3">
          <Skeleton width={100} height={20} baseColor="#374151" highlightColor="#4b5563" />
          <div className="flex gap-2">
            {/* Date Toggles */}
            <Skeleton width={70} height={35} borderRadius={20} inline className="mr-2" baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={70} height={35} borderRadius={20} inline className="mr-2" baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={70} height={35} borderRadius={20} inline className="mr-2" baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={70} height={35} borderRadius={20} inline baseColor="#374151" highlightColor="#4b5563" />
          </div>
        </div>
        <div className="pt-2 flex flex-col gap-3">
          <Skeleton width={100} height={20} baseColor="#374151" highlightColor="#4b5563" />
          <div className="flex gap-2">
            {/* Time Toggles */}
            <Skeleton width={80} height={35} borderRadius={20} inline className="mr-2" baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={80} height={35} borderRadius={20} inline className="mr-2" baseColor="#374151" highlightColor="#4b5563" />
            <Skeleton width={80} height={35} borderRadius={20} inline baseColor="#374151" highlightColor="#4b5563" />
          </div>
          <Skeleton width={180} height={12} baseColor="#374151" highlightColor="#4b5563" />
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <Skeleton width={60} height={20} baseColor="#374151" highlightColor="#4b5563" />
          <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded">
            <Skeleton count={2} baseColor="#374151" highlightColor="#4b5563" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperiencePageSkeleton;
