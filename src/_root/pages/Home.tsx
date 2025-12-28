import InfiniteScroll from 'react-infinite-scroll-component';
import Card from "../../components/Card"
import { GetExperiencesByLimit } from '../../utils/react-queries/queries/query-mutations';
import React from 'react';
const Home = () => {

  const {data:items, hasNextPage, fetchNextPage} = GetExperiencesByLimit();

  const totalDataLength = items?.pages.reduce((total, group)=>total+group?.data?.length, 0) || 0;


  return (
      <InfiniteScroll className='px-24 py-8'
        dataLength={totalDataLength}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<h4 className='text-gray-500 pt-2 text-xs text-center'>Loading...</h4>}
        endMessage={<h4 className='text-gray-500 pt-2 text-xs text-center'>No more results</h4>}
        >
      <div className="grid gap-3 grid-cols-5">
        
        {items && items.pages.length>0 && items.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map(({title, pic, place, price, description, _id}:{title:string; pic:string; place:string, price:number; description:string; _id:string}, i:number)=><Card 
        key={_id || i}
        _id={_id} 
        title={title} 
        pic={pic}
        place={place}
        price={price}
        description={description} 
        />)}
        </React.Fragment>
      ))}
      </div>
      </InfiniteScroll>
  )
}

export default Home
