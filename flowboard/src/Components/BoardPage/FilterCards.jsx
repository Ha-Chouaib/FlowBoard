import { useContext } from "react"
import {MembersContext} from '../../Contexts/MembersContext'

export default function FilterCards({searchTerm, OnSearchTermChanged, priorityFilter, OnPriorityFilterChanged,memberFilter,OnMemberFilterChanged }) {

    const {Members} = useContext(MembersContext);

  return (
    <form className="flex flex-row justify-center items-center gap-[2vw] mt-2">
        <input className="bg-[#18253B] w-[30%] outeline-none border-none h-[40px] rounded-lg px-5" 
            type="text" placeholder="search for card" name="searchTerm" 
            
            onInput={(e)=>{OnSearchTermChanged(e.target.value)}}/>
        <select className="cursor-pointer bg-[#18253B] w-[20%] outeline-none border-none h-[40px] rounded-lg px-5" 
                value={priorityFilter}
                onChange={(e)=>{OnPriorityFilterChanged(e.target.value);}}>
            <option value="all">All properites</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
        <select className="cursor-pointer bg-[#18253B] w-[20%] outeline-none border-none h-[40px] rounded-lg px-5" 
                value={memberFilter}
                onChange={(e)=>{OnMemberFilterChanged(e.target.value)}}>

            <option value="all">All members</option>
            {Members?.map((m, index) =>{
                return   <option value={m.name} key={index}>{m.name}</option>
            })}
        </select>
        <button type="button" className="border-[#71829D] border-[.5px] w-[100px] h-[40px] rounded-lg"
        onClick={()=>{}}>Reset</button>
    </form>
  )
}
