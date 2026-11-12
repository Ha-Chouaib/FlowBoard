import React, {createContext, useEffect, useState} from "react";
import Card from "../Components/Card";

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
        setCards([...Cards,card]);
        setAddedCards(prev => [...prev,card]);
    }

  return (
    <CardsListContext.Provider value={{Cards , loadCards,appendNewCard}}>
        {children}
    </CardsListContext.Provider>
  )
}
