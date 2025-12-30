import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MainSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* TopBar Skeleton */}
      {/* Responsive: px-4 on small, px-24 on large */}
      <div className="px-4 lg:px-24 py-4 flex items-center justify-between shadow-lg">
        {/* Left: Logo Placeholder */}
        <div>
          <Skeleton width={80} height={28} className="lg:!w-[100px] lg:!h-[32px]" />
        </div>

        {/* Right: Search Input & Button Placeholder */}
        {/* Hidden on small screens, shown on lg+ */}
        <div className="hidden lg:flex gap-2">
          <Skeleton width={200} height={40} borderRadius="0.375rem" />
          <Skeleton width={80} height={40} borderRadius="0.375rem" />
        </div>

        {/* Mobile: Just hamburger/menu icon */}
        <div className="lg:hidden">
          <Skeleton width={32} height={32} />
        </div>
      </div>

      {/* Outlet / Body Skeleton */}
      {/* Responsive: px-4 on small, px-24 on large */}
      {/* Grid: 1 column on mobile, 2 on md, 5 on lg+ */}
      <div className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-24">
        <div className="w-full grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {/* Render 6 Card Skeletons */}
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col gap-2 p-2 rounded-lg">
                {/* Image Placeholder */}
                <div className="w-full h-48 md:h-40 lg:h-48">
                  <Skeleton height="100%" borderRadius="0.5rem" className="block" />
                </div>

                {/* Title and Badge/Tag */}
                <div className="flex justify-between items-center mt-1">
                  <Skeleton width={100} height={20} />
                  <Skeleton width={60} height={24} borderRadius="0.25rem" />
                </div>

                {/* Description */}
                <div className="mt-1">
                  <Skeleton count={2} />
                </div>

                {/* Price Section */}
                <div className="mt-2 flex justify-between items-center">
                  <Skeleton width={70} height={20} />
                  <Skeleton width={90} height={36} borderRadius="0.375rem" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default MainSkeleton;