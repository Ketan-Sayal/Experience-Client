import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ExperiencePageSkeleton = () => {
  return (
    <div className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-24">
      {/* Top bar (Back arrow & Title) */}
      <div className="flex items-center gap-2 mb-4">
        <Skeleton circle width={24} height={24} />
        <Skeleton width={60} height={16} />
      </div>


      <div className="flex flex-col md:flex-row gap-7 pt-4 w-full">

        <div className="bg-gray-50 p-4 md:hidden w-full md:w-[50%] flex flex-col gap-3 rounded-lg h-fit">
          {/* Price Row */}
          <div className="flex justify-between items-center">
            <Skeleton width={80} />
            <Skeleton width={50} />
          </div>

          {/* Quantity Row */}
          <div className="flex justify-between items-center">
            <Skeleton width={60} />
            <div className="flex gap-1 items-center">
              <Skeleton width={32} height={32} borderRadius={4} /> {/* Plus Button */}
              <div className="w-4 text-center"><Skeleton width={10} /></div>
              <Skeleton width={32} height={32} borderRadius={4} /> {/* Minus Button */}
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <Skeleton width={60} />
            <Skeleton width={50} />
          </div>

          {/* Taxes */}
          <div className="flex justify-between items-center pt-2">
            <Skeleton width={40} />
            <Skeleton width={30} />
          </div>

          <hr className="border-gray-200" />

          {/* Total */}
          <div className="flex justify-between py-3 items-center">
            <Skeleton width={50} height={24} />
            <Skeleton width={60} height={24} />
          </div>

          {/* Confirm Button */}
          <Skeleton height={40} borderRadius="0.375rem" />
        </div>

        {/* Left Image Placeholder */}
        <div className="w-[109%] h-[300px]">
          <Skeleton 
            className="w-full h-full" 
            height="100%" 
            borderRadius="0.5rem" 
          />
        </div>

        {/* Right Pricing Card */}
        <div className="bg-gray-50 p-4 hidden w-[50%] md:flex flex-col gap-3 rounded-lg h-fit">
          {/* Price Row */}
          <div className="flex justify-between items-center">
            <Skeleton width={80} />
            <Skeleton width={50} />
          </div>

          {/* Quantity Row */}
          <div className="flex justify-between items-center">
            <Skeleton width={60} />
            <div className="flex gap-1 items-center">
              <Skeleton width={32} height={32} borderRadius={4} /> {/* Plus Button */}
              <div className="w-4 text-center"><Skeleton width={10} /></div>
              <Skeleton width={32} height={32} borderRadius={4} /> {/* Minus Button */}
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <Skeleton width={60} />
            <Skeleton width={50} />
          </div>

          {/* Taxes */}
          <div className="flex justify-between items-center pt-2">
            <Skeleton width={40} />
            <Skeleton width={30} />
          </div>

          <hr className="border-gray-200" />

          {/* Total */}
          <div className="flex justify-between py-3 items-center">
            <Skeleton width={50} height={24} />
            <Skeleton width={60} height={24} />
          </div>

          {/* Confirm Button */}
          <Skeleton height={40} borderRadius="0.375rem" />
        </div>
      </div>

      {/* Bottom Bar Section */}
      <div className="pt-4 flex flex-col gap-3 w-full md:w-[67%]">
        {/* Title */}
        <Skeleton width={150} height={28} />
        
        {/* Description (multi-line) */}
        <Skeleton count={3} />

        {/* Choose Date */}
        <div className="pt-2 flex flex-col gap-3">
          <Skeleton width={100} height={20} />
          <div className="flex gap-2">
            {/* Date Toggles */}
            <Skeleton width={70} height={35} borderRadius={20} inline className="mr-2" />
            <Skeleton width={70} height={35} borderRadius={20} inline className="mr-2" />
            <Skeleton width={70} height={35} borderRadius={20} inline className="mr-2" />
            <Skeleton width={70} height={35} borderRadius={20} inline />
          </div>
        </div>

        {/* Choose Time */}
        <div className="pt-2 flex flex-col gap-3">
          <Skeleton width={100} height={20} />
          <div className="flex gap-2">
            {/* Time Toggles */}
            <Skeleton width={80} height={35} borderRadius={20} inline className="mr-2" />
            <Skeleton width={80} height={35} borderRadius={20} inline className="mr-2" />
            <Skeleton width={80} height={35} borderRadius={20} inline />
          </div>
          <Skeleton width={180} height={12} />
        </div>

        {/* About Section */}
        <div className="flex flex-col gap-3 mt-2">
          <Skeleton width={60} height={20} />
          <div className="px-3 py-2 bg-gray-100 rounded">
            <Skeleton count={2} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperiencePageSkeleton;
