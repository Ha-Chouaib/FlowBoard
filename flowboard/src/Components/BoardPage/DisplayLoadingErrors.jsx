import React from 'react'

export default function DisplayLoadingErrors({isSuccess , errorMsg , retry}) {

    if(isSuccess) return;


  return (
    <div className='w-[100%] h-[50px] rounded-lg bg-[#f800003a] text-[#ff0000] border-2 border-[#ff0000] flex flex-row justify-between items-center px-10'>
        <small>{errorMsg}</small>
         <button className=' bg-[#f800003a] text-[#f1eeee8c] border-2 border-[#ff0000] w-[100px] h-[30px] rounded-lg'
                onClick={()=>{retry()}} >Retry</button>
    </div>
  )
}
