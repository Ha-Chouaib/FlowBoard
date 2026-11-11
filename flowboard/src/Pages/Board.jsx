
import Header from "../Components/BoardPage/Header"
import FilterCards from "../Components/BoardPage/FilterCards"
import ListCards from "../Components/BoardPage/ListCards"
import { CardsListContext } from "../Contexts/CardsContext"
import {MembersContext} from '../Contexts/MembersContext'
import { useContext, useEffect, useState } from "react"

export default function Board() {
    const { Cards , loadCards} = useContext(CardsListContext);
    // const {Members ,loadMembers} = useContext(MembersContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [memberFilter, setMemberFilter] = useState("all");


    useEffect(()=>{
        loadCards();
        // loadMembers();
    },[])

    useEffect(()=>{
        
        // console.log(Members)

    },[searchTerm,priorityFilter,memberFilter]);
   
  return (
    <div className="[grid-area:main] max-h-screen overflow-y-auto">
        <Header/>
        <FilterCards OnSearchTermChanged={setSearchTerm} priorityFilter={priorityFilter} OnPriorityFilterChanged={setPriorityFilter}
                    memberFilter={memberFilter} OnMemberFilterChanged={setMemberFilter}/>
        <div className="flex flex-row justify-center items-center gap-5 mt-10">

            <ListCards cards = {Cards?.filter(c => c.status ==="todo" ) } />
            <ListCards cards = {Cards?.filter(c => c.status ==="in-progress" ) }/>
            <ListCards cards = {Cards?.filter(c => c.status ==="done" )}/>
        </div>
        
    </div>
  )
}
