import React, {createContext, useState} from "react";
import Card from "../Components/Card";

export const CardsListContext = createContext(null);

export default function CardsListProvider({children}) {

    const [Cards , setCards] = useState([]);

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
                setCards(data);
            
            }).catch(e => {
                isRejected({success:false, errorMsg: e.message});
                
            });
            
    }
    
    function appendNewCard(card)
    {
        setCards([...Cards,card]);
    }

  return (
    <CardsListContext.Provider value={{Cards , loadCards,appendNewCard}}>
        {children}
    </CardsListContext.Provider>
  )
}
