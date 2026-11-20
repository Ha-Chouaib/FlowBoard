import React, {createContext, useEffect, useState} from "react";
import axios from 'axios'  
import { useShowFailureState,useShowPendingState,useShowSuccessState } from "../Hooks/useShowRequestState";

export const CardsListContext = createContext(null);

export default function CardsListProvider({children}) {

    const apiKey =  process.env.REACT_APP_GEMINI_API_KEY;

   
  
    const [Cards , setCards] = useState([]);

    const Pending = (msg = "Bringing the data, please wait.")=> useShowPendingState(msg);
    const Success = (msg = "Data fetched successfully") => useShowSuccessState(msg);
    const Failure = (error) => useShowFailureState(error);

    async function loadTasks(searchTerm, priority, member , isRejected)
    {

        const params = {
          
        }

        if(searchTerm)
            params.title_like = searchTerm;
           
        if(priority && priority !== "all")
            params.priority = priority;
            
        if(member && member !== "all")
            params.assignee = member;
            

    
    const options = {
      method: 'GET',
      url: 'https://flowboard-api-virid.vercel.app/cards',
      params: params,
      headers: {
        'X-Workspace': 'public'
      }
    }

    try {
        // Pending();
        const { data } = await axios.request(options)
        setCards(data);
        // Success();
        if(isRejected)
        isRejected({success:true, errorMsg:""});

    } catch (error) {
        Failure(error);
        if(isRejected)
            isRejected({success:false, errorMsg: error});

    }
            
    }
    
    async function appendNewTask(card)
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
    async function updateTask(card)
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
        loadTasks()
        Success();
            
        } catch (error) {
          Failure(error)
        }
    }

    async function deleteTask(id)
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

    async function getTask(id) {
        

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
    async function generateTasksWIthAI(description,tasksCount) {
        
        const options = {
            method: 'POST',
            url: 'https://flowboard-api-virid.vercel.app/ai/cards',
            headers: {
              'X-Workspace': 'public',
              'Content-Type': 'application/json'
            },
            data: {
              description: description,
              apiKey: process.env.REACT_APP_GEMINI_API_KEY,
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
            loadTasks()
        } catch (error) {
          

            Failure(error);
        }
    }
    async function updateTaskStatus(taskID,status) {
     
      const options = {
        method: 'PATCH',
        url: 'https://flowboard-api-virid.vercel.app/cards/'+taskID +"?password=1234",
        headers: {
          'X-Workspace': 'public',
          'Content-Type': 'application/json'
        },
        data: {
          status: status
        }
      }

      try {
        
        const { data } = await axios.request(options)
        loadTasks()
      } catch (error) {
        Failure("couldn't change task status")
      }      
    }
  return (
    <CardsListContext.Provider value={{Cards , loadCards: loadTasks,appendNewCard: appendNewTask,updateCard: updateTask,deleteCard: deleteTask,getCard: getTask, generateCardsWIthAI: generateTasksWIthAI,updateTaskStatus}}>
        {children}
    </CardsListContext.Provider>
  )
}

