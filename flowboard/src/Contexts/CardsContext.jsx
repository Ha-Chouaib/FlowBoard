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

    const Pending = (msg = "Bringing the data, please wait.")=> useShowPendingState(msg);
    const Success = (msg = "Data fetched successfully") => useShowSuccessState(msg);
    const Failure = (error) => useShowFailureState(error);

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
                    if(isRejected)
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
                if(isRejected)
                isRejected({success:false, errorMsg: e.message});
                
            });
            
    }
    
    async function appendNewCard(card)
    {

        const options = {
          method: 'POST',
          url: 'https://flowboard-api-virid.vercel.app/cards',
          headers: {
            'X-Workspace': 'public',
            'Content-Type': 'application/json'
          },
          data: card,
          params:{password : "1234"},
        }

        try {
            Pending()
            const { data } = await axios.request(options)
            Success("Task Added Successfully :)")
            setCards([...Cards,card])
        } catch (error) {
            Failure(error)
        }
        
    }
    async function updateCard(card)
    {
    
        const options = {
          method: 'PUT',
          url: `https://flowboard-api-virid.vercel.app/cards/${card.id}?password=1234`,
          headers: {
            'X-Workspace': 'public',
            'Content-Type': 'application/json',
          },
          data: card,
        }

        try {

        Pending();
        const { data } = await axios.request(options);
        loadCards()
        Success();
            
        } catch (error) {
          Failure(error)
        }
    }

    async function deleteCard(id)
    {

        const options = {
          method: 'DELETE',
          url: `https://flowboard-api-virid.vercel.app/cards/${id}?password=1234`,
          headers: {
            'X-Workspace': 'public'
          }
        }

        try {
            Pending();
            const { data } = await axios.request(options)
            setCards(prev => prev.filter(c => c.id !== id));
            Success();

        } catch (error) {
            Failure();
        }
    }

    async function getCard(id) {
        

    const options = {
      method: 'GET',
      url: 'https://flowboard-api-virid.vercel.app/cards/'+id,
      headers: {
        'X-Workspace': 'public'
      }
    }

    try {
      const { data } = await axios.request(options)
      return data;
    } catch (error) {
      console.error(error)
      return null;
    }
    }
    async function generateCardsWIthAI(description,tasksCount) {
        console.log(description,tasksCount)
        const options = {
            method: 'POST',
            url: 'https://flowboard-api-virid.vercel.app/ai/cards',
            headers: {
              'X-Workspace': 'public',
              'Content-Type': 'application/json'
            },
            data: {
              description: description,
              apiKey: 'gemini-3.1-flash-lite',
              count: tasksCount
            },
            params:{
            password:"1234", 
            },
            timeout: 30000
        }

        try {
            Pending("Generating tasks ongoing ...")
            const { data } = await axios.request(options)
            Success("Tasks are generated successfully :)")
            loadCards()
          console.log(data)
        } catch (error) {
            Failure(error);
        }
    }

  return (
    <CardsListContext.Provider value={{Cards , loadCards,appendNewCard,updateCard,deleteCard,getCard, generateCardsWIthAI}}>
        {children}
    </CardsListContext.Provider>
  )
}

