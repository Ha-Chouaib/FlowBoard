
import Header from "../Components/BoardPage/Header"
import FilterCards from "../Components/BoardPage/FilterCards"
import ListCards from "../Components/BoardPage/ListCards"
import { CardsListContext } from "../Contexts/CardsContext"
import {MembersContext} from '../Contexts/MembersContext'
import AddNewCard from "../Components/BoardPage/AddNewCard"
import DisplayLoadingErrors from "../Components/BoardPage/DisplayLoadingErrors"
import { useContext, useEffect, useState } from "react"
import { createPortal } from 'react-dom';
import Modal from "../Components/Modal"
import AddCardsByAI from "../Components/BoardPage/AddCardsByAI"
import {DndContext,DragOverlay} from '@dnd-kit/core'

export default function Board() {
    const filtersKey = "filters";
    const [filters, setFilters] = useState( JSON.parse( localStorage.getItem(filtersKey) ) ?? {priority: "all", member:"all"});
    
    const { Cards , loadCards: loadTasks,appendNewCard , generateCardsWIthAI,updateTaskStatus} = useContext(CardsListContext);
    const {Members ,loadMembers} = useContext(MembersContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState(filters.priority);
    const [memberFilter, setMemberFilter] = useState(filters.member);
    const [IsAddNewWindowOpen, setAddNewOpenState] = useState(false);
    const [IsAddAIwindowOpen, setAddAIOpenState] = useState(false);
    const [successObj, setSuccess ] = useState({success: true, errorMsg:""});

    const [activeCard, setActiveCard] = useState(null);

    const retry = () => loadTasks(searchTerm,priorityFilter,memberFilter, setSuccess)

    let filteredCards = [];
    useEffect(()=>{
        loadMembers();
    },[])

    useEffect(()=>{
        loadTasks(searchTerm,priorityFilter,memberFilter, setSuccess);

    },[Members,searchTerm,priorityFilter,memberFilter]);

    filteredCards = Cards;

    async function handleDragEnd(event) {
    const { active, over } = event;

    if (over) {
        const taskId = active.id;
        const newStatus = over.id;

        const draggedCard = Cards.find(
            card => card.id === taskId
        );

        if (draggedCard && draggedCard.status !== newStatus) {
           updateTaskStatus(taskId,newStatus);
        }
    }

}

  return (
    <div className="[grid-area:main] max-h-screen overflow-y-auto  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative  flex justify-start flex-col gap-1 ">
        <Modal modalContent={<AddCardsByAI OnClose={setAddAIOpenState} generateTasks={generateCardsWIthAI}/>} isOpen={IsAddAIwindowOpen} mainBg="#06162c61"/>
        <Modal modalContent={<AddNewCard OnClose={setAddNewOpenState} AppendCard={appendNewCard}/>} isOpen={IsAddNewWindowOpen} mainBg="#06162c61"/>
        
        <Header OpenAddNewCardWindow ={setAddNewOpenState} OpenAddAIWindow={setAddAIOpenState}/>
        <DisplayLoadingErrors isSuccess={successObj.success} errorMsg={successObj.errorMsg} retry={retry}/>
        <FilterCards OnSearchTermChanged={setSearchTerm} Filters={filters} OnFiltersChanged={setFilters} filtersKey={filtersKey} OnPriorityFilterChanged={setPriorityFilter}
                    OnMemberFilterChanged={setMemberFilter} />
        <DndContext onDragEnd={handleDragEnd}>      
        <div  className="flex flex-row justify-center items-start gap-5 mt-4 flex-wrap">
            
            <ListCards cards = {filteredCards?.filter(c => c.status ==="todo" ) } status={"todo"} />
            <ListCards cards = {filteredCards?.filter(c => c.status ==="in-progress" ) } status={"in-progress"}/>
            <ListCards cards = {filteredCards?.filter(c => c.status ==="done" )} status={"done"}/>
          
        </div>
        </DndContext>
    </div>
  )
}
