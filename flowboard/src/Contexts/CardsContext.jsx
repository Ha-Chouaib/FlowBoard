import React, {createContext, useEffect, useState} from "react";
import axios from 'axios'  
import { useShowFailureState,useShowPendingState,useShowSuccessState } from "../Hooks/useShowRequestState";

export const CardsListContext = createContext(null);

export default function CardsListProvider({children}) {

    const addedCardsKey = "addedCards";

    const [Cards , setCards] = useState([]);
    const [addedCards, setAddedCards] =  useState(() => {return JSON.parse(localStorage.getItem(addedCardsKey)) ?? [];});

    
    useEffect(()=>{
        localStorage.setItem(
        addedCardsKey,
        JSON.stringify(addedCards)
    );
    },[addedCards]);

    const Pending = ()=> useShowPendingState();
    const Success = () => useShowSuccessState();
    const Failure = (error) => useShowFailureState(error)

    function loadCards(searchTerm, priority, member , isRejected)
    {
        const url = new URL("/cards","https://flowboard-api-virid.vercel.app");
        const searchTermKey = "title_like";
        const priorityKey = "priority";
        const memberKey = "assignee";

        if(searchTerm)
            url.searchParams.set(searchTermKey,searchTerm);
           
        if(priority && priority !== "all")
            url.searchParams.set(priorityKey,priority);
            
        if(member && member !== "all")
            url.searchParams.set(memberKey,member);
            

        let result = fetch(url.toString(), {headers: {'X-Workspace': 'public'}});

            result.then( res =>{
                if(res.ok)
                {   
                    isRejected({success:true, errorMsg:""});
                    return res.json();
                }else
                    throw new Error(res.statusText);

            }).then( data =>{

                
                let filtredLocalCards = addedCards;

                 
                

                if(filtredLocalCards.length > 0)
                {
                    if(searchTerm)
                        filtredLocalCards= filtredLocalCards?.filter(c => c.title?.toLocaleLowerCase().includes(searchTerm?.toLocaleLowerCase()))
                    if(priority && priority !== "all")
                        filtredLocalCards = filtredLocalCards?.filter(c => c.priority === priority);
                    if(member && member !== "all")
                        filtredLocalCards = filtredLocalCards?.filter(c => c.assignee === member);

                    setCards([...data,...filtredLocalCards]);
                }
                else
                    setCards(data);
                
            }).catch(e => {
                isRejected({success:false, errorMsg: e.message});
                
            });
            
    }
    
    function appendNewCard(card)
    {

        // const options = {
        //   method: 'POST',
        //   url: 'https://flowboard-api-virid.vercel.app/cards',
        //   headers: {
        //     'X-Workspace': 'public',
        //     'Content-Type': 'application/json'
        //   },
        //   data: {
        //     title: 'Ajouter le mode sombre',
        //     status: 'todo',
        //     priority: 'medium',
        //     assignee: 'Amina Haddad',
        //     dueDate: '2026-12-01',
        //     tags: ['ui']
        //   }
        // }

        // try {
        //   const { data } = await axios.request(options)
        //   console.log(data)
        // } catch (error) {
        //   console.error(error)
        // }
        setCards([...Cards,card]);
        setAddedCards(prev => [...prev,card]);
    }
    async function updateCard(card)
    {
    
        const options = {
          method: 'PUT',
          url: `https://flowboard-api-virid.vercel.app/cards/${card.id}`,
          headers: {
            'X-Workspace': 'public',
            'Content-Type': 'application/json',
            'Password':'1234'
          },
          data: card,
        }

        try {

        Pending();
        const { data } = await axios.request(options);

            let target =Cards.find(c => c.id === card.id);
            target.title = card.title;
            target.description = card.description;
            target.status = card.status;
            target.priority = card.priority;
            target.assignee = card.member;
            target.dueDate = card.dueDate;
            target.tags = card.Tags;
            target.updatedAt =  card.updatedAt ;
            Success();
            console.log(data)
        } catch (error) {
          Failure(error)
        }
    }

  return (
    <CardsListContext.Provider value={{Cards , loadCards,appendNewCard,updateCard}}>
        {children}
    </CardsListContext.Provider>
  )
}

