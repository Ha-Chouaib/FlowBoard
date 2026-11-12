import React, {createContext, useState} from "react";
import Card from "../Components/Card";

export const CardsListContext = createContext(null);

export default function CardsListProvider({children}) {

    const [Cards , setCards] = useState([]);
    const [addedCards, setAddedCards] =  useState([]);

    const addedCardsKey = "addedCards";

    function loadCards(searchTerm, priority, member , isRejected)
    {
        const url = new URL("/cards","https://flowboard-api-virid.vercel.app");
        const searchTermKey = "title_like";
        const priorityKey = "priority";
        const memberKey = "assignee";

        setAddedCards(JSON.parse(localStorage.getItem(addedCardsKey)) ?? []);
        let filtredLocalCards = addedCards;
        if(searchTerm)
        {
            url.searchParams.set(searchTermKey,searchTerm);
            filtredLocalCards= filtredLocalCards.filter(c => c.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        }
           
        if(priority && priority !== "all")
        {
            url.searchParams.set(priorityKey,priority);
            filtredLocalCards = filtredLocalCards.filter(c => c.priority === priority);
        }
            
        if(member && member !== "all")
        {
            url.searchParams.set(memberKey,member);
            filtredLocalCards = filtredLocalCards.filter(c => c.assignee === member);
        }
            

        let result = fetch(url.toString(), {
                        headers: {
                          'X-Workspace': 'public'
                        }});
            result.then( res =>{
                if(res.ok)
                {   
                    isRejected({success:true, errorMsg:""});
                    return res.json();
                }else
                {
                    throw new Error(res.statusText)
                }
            }).then( data =>{

                if(filtredLocalCards.length > 0)
                    setCards([...data,...filtredLocalCards]);
                else
                    setCards(data);
                
            }).catch(e => {
                isRejected({success:false, errorMsg: e.message});
                
            });
            
    }
    
    function appendNewCard(card)
    {
        setCards([...Cards,card]);
        setAddedCards([...addedCards,card]);
        localStorage.setItem(addedCardsKey,JSON.stringify(addedCards));
    }

  return (
    <CardsListContext.Provider value={{Cards , loadCards,appendNewCard}}>
        {children}
    </CardsListContext.Provider>
  )
}
