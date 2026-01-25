import { useParams } from "react-router-dom"
import { GetExperienceBySearchVal } from "../../utils/react-queries/queries/query-mutations";
import SearchPageSkeleton from "../../components/SearchPageSkeleton";
import Card from "../../components/Card";
import { toast } from "sonner";

const SearchPage = () => {
    const {searchVal} = useParams();
    const {isLoading, data:experienceData, isError} = GetExperienceBySearchVal(searchVal || '');
    if(isLoading){
        return <SearchPageSkeleton/>
    }

    if(isError){
      toast.error("Search failed");
    }
    
  return (
    <div className="px-2 py-2 lg:px-24 lg:py-4 min-h-screen overflow-x-hidden">
      
      <div className="w-full grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
      ):(<p className='text-gray-500 dark:text-gray-400 pt-2 w-screen text-xs text-center'>
        No results found
      </p>)}
      </div>
    </div>
  )
}

export default SearchPage;
