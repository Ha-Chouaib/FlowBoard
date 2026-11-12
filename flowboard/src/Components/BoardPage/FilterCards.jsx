import { useContext , useRef} from "react"
import {MembersContext} from '../../Contexts/MembersContext'

export default function FilterCards({OnSearchTermChanged, priorityFilter, OnPriorityFilterChanged,memberFilter,OnMemberFilterChanged }) {

    const {Members} = useContext(MembersContext);

    const titleRef = useRef(null);
    const priorityRef = useRef(null);
    const memberRef = useRef(null);
    function Reset()
    {
        titleRef.current.value = "";
        priorityRef.current.value = "all";
        memberRef.current.value = "all";
        OnSearchTermChanged("");
        OnMemberFilterChanged("all");
        OnPriorityFilterChanged("all");

    }

  return (
    <form className="flex flex-row justify-center items-center gap-[2vw] mt-2">
        <input className="bg-[#18253B] w-[30%] outeline-none border-none h-[40px] rounded-lg px-5" 
            type="text" placeholder="search for card" name="searchTerm" 
            ref={titleRef}
            onInput={(e)=>{OnSearchTermChanged(e.target.value)}}/>
        <select className="cursor-pointer bg-[#18253B] w-[20%] outeline-none border-none h-[40px] rounded-lg px-5" 
                value={priorityFilter}
                ref={priorityRef}
                onChange={(e)=>{OnPriorityFilterChanged(e.target.value);}}>
            <option value="all">All properites</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
        <select className="cursor-pointer bg-[#18253B] w-[20%] outeline-none border-none h-[40px] rounded-lg px-5" 
                value={memberFilter}
                ref={memberRef}
                onChange={(e)=>{OnMemberFilterChanged(e.target.value)}}>

            <option value="all">All members</option>
            {Members?.map((m, index) =>{
                return   <option value={m.name} key={index}>{m.name}</option>
            })}
        </select>
        <button type="button" className="border-[#71829D] border-[.5px] w-[100px] h-[40px] rounded-lg"
        onClick={()=>{Reset()}}>Reset</button>
    </form>
  )
}
