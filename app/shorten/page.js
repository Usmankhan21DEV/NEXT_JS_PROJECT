
"use client"
import React,{useState} from 'react'
import Link from 'next/link'
import { Result } from 'postcss'
const Shorten = () => {
  const [url,seturl] = useState("")
    const [short,setshort] = useState("")
    const [generated,setgenerated] = useState("")
    const generate =()=>{
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ url: url, shorturl: short })
      };
      
      fetch('/api/generate', options)
        .then(response => response.json())
        .then((result) => {
            if(result.success !="false")
            {setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${short}`)            
            } else{
              alert(result.message)
              setgenerated("");
            }

            seturl("")
            setshort("")
         
          
        })
        .catch(err => console.error(err));
    }
  return (<>
    <div className='mx-auto max-w-lg bg-purple-200 my-16 p-8 rounded-lg flex flex-col gap-4'>
      <h1 className='font-bold text-2xl'>Premium</h1>
    <div className='flex flex-col gap-3'>
        <input type='text' 
        className='px-4 py-2 focus:outline-purple-600 rounded-md'
        placeholder='Enter Your URL' 
        onChange={e=>{seturl(e.target.value)}}
        value={url}/>
        
        <input type='text' 
        className='px-4 py-2 focus:outline-purple-600 rounded-md'
        placeholder='Enter Your Prefered SHORT URL Text'
        onChange={e=>{setshort(e.target.value)}}
        value={short}/>
        <button onClick={generate} className='bg-purple-500 rounded-lg p-3 py-1 my-3 font-bold text-white'>GENERTATE</button>
    </div>
    {generated&&<>
       <span className='font-bold text-lg'> Your Link </span><code><Link target='_blank' href={generated}>{generated}</Link>
      </code></>}
    </div>
    </>
  )
}

export default Shorten