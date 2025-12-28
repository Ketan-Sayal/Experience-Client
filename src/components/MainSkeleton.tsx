import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MainSkeleton = () => {
  return (
     <div className="min-h-screen bg-white">
      {/* TopBar Skeleton */}
      {/* Matches: px-24 py-4 flex items-center justify-between shadow-lg */}
      <div className="px-24 py-4 flex items-center justify-between shadow-lg">
        {/* Left: Logo Placeholder */}
        <div>
          <Skeleton width={100} height={32} />
        </div>

        {/* Right: Search Input & Button Placeholder */}
        {/* Matches: flex gap-2 */}
        <div className="flex gap-2">
          <Skeleton width={200} height={40} borderRadius="0.375rem" /> {/* Input */}
          <Skeleton width={80} height={40} borderRadius="0.375rem" />  {/* Button */}
        </div>
      </div>

      {/* Outlet / Body Skeleton (HomeSkeleton Style) */}
      <div className="px-24 py-8">
        <div className="grid gap-3 grid-cols-5">
          {/* Render 10 Card Skeletons to fill the screen */}
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

export default MainSkeleton;
