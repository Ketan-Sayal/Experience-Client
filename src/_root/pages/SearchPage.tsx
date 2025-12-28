import { useParams } from "react-router-dom"
import { GetExperienceBySearchVal } from "../../utils/react-queries/queries/query-mutations";
import SearchPageSkeleton from "../../components/SearchPageSkeleton";
import Card from "../../components/Card";

const SearchPage = () => {
    const {searchVal} = useParams();
    const {isLoading, data:experienceData, isError} = GetExperienceBySearchVal(searchVal || '');
    if(isLoading){
        return <SearchPageSkeleton/>
    }
    
  return (
    <div className="px-24 py-8 min-h-screen">
      {isError && <div className="fixed top-10 left-0 w-full flex justify-center">
            <p className="bg-red-500 w-fit px-4 rounded-md text-center py-3 text-white font-semibold">Something went wrong</p>
        </div>}
      <div className="grid gap-3 grid-cols-5 w-full h-full">
        {experienceData?.experiences?.length>0?(
            <>
              {experienceData?.experiences.map(({title, pic, place, price, description, _id}:{title:string; pic:string; place:string, price:number; description:string; _id:string}, i:number)=><Card 
        key={_id || i}
        _id={_id} 
        title={title} 
        pic={pic}
        place={place}
        price={price}
        description={description} 
        />)}
        </>
      ):(<p className='text-gray-500 pt-2 w-screen text-xs text-center'>
        No results found
      </p>)}
      </div>
    </div>
  )
}

export default SearchPage
