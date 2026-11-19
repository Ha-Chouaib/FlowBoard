import { useState } from 'react'
import AIbg from '../../Assets/AIbg.png';

    

export default function AddCardsByAI({OnClose,generateTasks}) {

    const [description , setDescription] = useState("");
    const [tasksCount, setTasksCount] = useState(1);
  return (
    <form onSubmit={(e)=>{e.preventDefault();
        generateTasks(description,tasksCount)
    }}
        style= {{ backgroundImage: `url(${AIbg})`}}
        className="bg-cover bg-center bg-no-repeat  w-[100%] h-[400px] rounded-lg flex flex-col gap-6 shadow-[1px_1px_25px_5px_black]">
         <div className="flex flex-row justify-between items-center ">
            <h3 className="font-black text-[2vw] px-10">Generate Tasks With <span className='text-[#2f00ff]'>A</span><span className='text-[#5900ff]'>I</span></h3>
            <span className="opacity-80 flex flex-row items-center justify-center bg-black rounded-full w-[30px] h-[30px] cursor-pointer
                            shadow-[inset_1px_1px_5px_1px_red]"
                  onClick={()=>{OnClose(false)}}>X</span>
        </div>
        <div className='grow px-10 flex flex-col gap-4'>
            <label className='w-full flex flex-col gap-2'>
                <div className='flex justify-between'>
                    <small className='opacity-80 font-bold'>Task description</small>
                    <button type='button' onClick={()=>{setDescription("")}} className='font-bold text-2xl'>🗑</button>
                </div>
                
                <textarea name="description" required minLength={20} maxLength={1000} value={description}
                    placeholder='This description will be splited to many tasks, based on your tasks count you choose'
                    className='grow bg-[#020929a4] rounded-lg p-5  shadow-[inset_1px_1px_15px_1px_#5900ff] h-[200px]'
                    onChange={(e)=>{setDescription(e.currentTarget.value)}}></textarea>
            </label>

            <div className='flex items-center justify-between'>
                <label className='w-1/3 flex flex-col gap-1' >
                    <small className='opacity-70 font-bold'>Tasks count</small>
                    <input type='Number' min={1} max={10} name='tasksCount' onChange={(e)=>{ setTasksCount(Number(e.currentTarget.value))}}
                     className='bg-[#000000b6] h-10 rounded-lg px-3'/>
                </label>
                <button  className=' bg-[#0066ff] px-5 py-2 rounded-full shadow-[inset_3px_3px_30px_6px_#5900ff] text-[#ffffffec]'>Generate tasks</button>
            </div>
        </div>

    </form>
  )
}
