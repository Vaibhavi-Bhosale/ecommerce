import React from 'react'
import { useState } from 'react'
import { getSearchApi } from '../api/productApi';

export default function Search() {

    const [product, setProduct ] = useState("");

     const search =  async()=>{
          console.log(product);

          const res = await getSearchApi(product);
          console.log(res.data)
          
     }
  return (
    <div>
        <input type="text"
               onChange={(e)=>setProduct(e.target.value)}
               value={product}
                className='border-b-black bg-amber-200'/>

        <button onClick={search}
        className='bg-pink-300'>Search</button>
    </div>
  )
}

 
