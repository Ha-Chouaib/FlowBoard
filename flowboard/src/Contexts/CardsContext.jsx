import React, {createContext, useState} from "react";
import Card from "../Components/Card";

export const CardsListContext = createContext(null);

export default function CardsListProvider({children}) {

    const [Cards , setCards] = useState([]);

    function loadCards()
    {
        let result = fetch('https://flowboard-api-virid.vercel.app/cards', {
                        headers: {
                          'X-Workspace': 'public'
                        }});
            result.then( res =>{
                if(res.ok)
                {
                    return res.json();
                }
            }).then( data =>{
                setCards(data);
            }).catch(e => {
                console.log(e);
            });
            
    }
    function appendNewCard(card)
    {
        setCards([...Cards,card]);
    }

  return (
    <CardsListContext.Provider value={{Cards , loadCards, appendNewCard}}>
        {children}
    </CardsListContext.Provider>
  )
}
