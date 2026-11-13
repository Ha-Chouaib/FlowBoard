
import Header from "../Components/BoardPage/Header"
import FilterCards from "../Components/BoardPage/FilterCards"
import ListCards from "../Components/BoardPage/ListCards"
import { CardsListContext } from "../Contexts/CardsContext"
import {MembersContext} from '../Contexts/MembersContext'
import AddNewCard from "../Components/BoardPage/AddNewCard"
import DisplayLoadingErrors from "../Components/BoardPage/DisplayLoadingErrors"
import { useContext, useEffect, useState } from "react"
import Modal from "../Components/Modal"

export default function Board() {
    const filtersKey = "filters";
    const [filters, setFilters] = useState( JSON.parse( localStorage.getItem(filtersKey) ) ?? {priority: "all", member:"all"});
    
    const { Cards , loadCards,appendNewCard} = useContext(CardsListContext);
    const {Members ,loadMembers} = useContext(MembersContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState(filters.priority);
    const [memberFilter, setMemberFilter] = useState(filters.member);
    const [IsAddNewWindowOpen, setAddNewOpenState] = useState(false);
    const [successObj, setSuccess ] = useState({success: true, errorMsg:""});

    const retry = () => loadCards(searchTerm,priorityFilter,memberFilter, setSuccess)

    let filteredCards = [];
    useEffect(()=>{
        loadMembers();
    },[])

    useEffect(()=>{
        loadCards(searchTerm,priorityFilter,memberFilter, setSuccess);

    },[Members,searchTerm,priorityFilter,memberFilter]);

    filteredCards = Cards;
    

  return (
    <div className="[grid-area:main] max-h-screen overflow-y-auto relative  flex justify-start flex-col gap-1">
        <Modal modalContent={<AddNewCard OnClose={setAddNewOpenState} AppendCard={appendNewCard}/>} isOpen={IsAddNewWindowOpen} mainBg="#06162c61"/>
        <Header OpenAddNewCardWindow ={setAddNewOpenState}/>
        <DisplayLoadingErrors isSuccess={successObj.success} errorMsg={successObj.errorMsg} retry={retry}/>
        <FilterCards OnSearchTermChanged={setSearchTerm} Filters={filters} OnFiltersChanged={setFilters} filtersKey={filtersKey} OnPriorityFilterChanged={setPriorityFilter}
                    OnMemberFilterChanged={setMemberFilter} />
        <div className="flex flex-row justify-center items-start gap-5 mt-4">

            <ListCards cards = {filteredCards?.filter(c => c.status ==="todo" ) } />
            <ListCards cards = {filteredCards?.filter(c => c.status ==="in-progress" ) }/>
            <ListCards cards = {filteredCards?.filter(c => c.status ==="done" )}/>
        </div>
    
    </div>
  )
}
