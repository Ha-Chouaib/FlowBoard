
import { useContext, useState } from 'react';
import {MembersContext} from '../../Contexts/MembersContext'


export default function AddNewCard({OnClose, AppendCard}) {

      const {Members} = useContext(MembersContext);
      

      const currentCard = {
        id: -1,
        title: "",
        description: "",
        status: "",
        priority: "",
        assignee: "",
        dueDate: "",
        tags: [],
        createdAt:"",
        updatedAt: ""
      }
      
      const [title , setTitle] = useState("");
      const [dueDate, setDueDate] = useState("");
      const [description, setDescription] = useState("");
      const [priority, setPriority] = useState("low");
      const [member, setMember] = useState("");
      const [status, setStatus] = useState("todo");
      const [Tags, setTags] = useState([]);

      const appendTag = (tag)=>{
        if(!Tags.includes(tag))
          setTags([...Tags,tag]);
        
      }
      const removeTag = (tag) =>{
        setTags(Tags.filter(( t => t !== tag )));
      }
      
      function resetForm()
      {
        setTitle("")
      }

      function saveData()
      {
        //...
        currentCard.id = -1;
        currentCard.title = title;
        currentCard.description = description;
        currentCard.status = status;
        currentCard.priority = priority;
        currentCard.assignee = member;
        currentCard.dueDate = dueDate;
        currentCard.tags = Tags;
        currentCard.createdAt =  Date.now().toString() ;
        currentCard.updatedAt =  Date.now().toString() ;
        
        //...
        AppendCard(currentCard)
      }
      function cancelOperation()
      {
        OnClose(false);
      }
  return (
    <form className='h-[100%] flex flex-col gap-4'>
        <div className="flex flex-row justify-between items-center ">
            <div className="flex flex-row items-center gap-4">
              <span className="w-[30px] h-[30px] rounded-full bg-[#006aff] flex flex-row items-center justify-center font-bold text-[20px]">+</span>
               <h3 className="font-black text-[2vw] ">New Card</h3>
            </div>
            <span className="opacity-80 flex flex-row items-center justify-center bg-black rounded-full w-[30px] h-[30px] cursor-pointer
                            shadow-[inset_1px_1px_5px_1px_red]"
                  onClick={()=>{OnClose(false)}}>X</span>
        </div>
        
        < div className='flex flex-col grow gap-5'>

        <div className='flex flex-row justify-between items-center'>
           <label className='flex flex-col gap-1 w-[50%]'>
            <small className='opacity-75'>Title*</small>
            <input onChange={(e)=>{setTitle(e.currentTarget.value)}} 
            className='grow outline-none rounded-lg bg-[#0425529f] h-[40px] px-4 border-2 border-[#b4c2d54c]'
            type="text" placeholder="enter the cards title" required maxLength={100} name="cardTitle" />
          </label>
          <label className='flex flex-col gap-1 w-[45%]'>
            <small className='opacity-75'>Due Date</small>
            <input onChange={(e)=>{setDueDate(e.currentTarget.value)}} 
            className='grow outline-none rounded-lg bg-[#0425529f] h-[40px] px-4 border-2 border-[#b4c2d54c]'
            type='date' name='dueDate' />
          </label>
        </div>
         
         <div className='flex flex-row justify-between items-center '>

          <div className='w-[50%] bg-[#0425529f] rounded-lg border-2 border-[#b4c2d54c] p-2'>
              <div className='flex flex-row justify-between items-center bg-[#006aff3a] p-2 rounded-full gap-2 '>

              <small className='opacity-75'>Tags</small>
              <input className='grow outline-none bg-black rounded-lg p-2'
              type="text" name='tag' placeholder='enter a tag name' />

               <button type='button' onClick={(e)=>{appendTag(e.currentTarget.previousElementSibling.value); e.currentTarget.previousElementSibling.value=""}}
               className='bg-[#0068fa] w-[50px] h-[30px] rounded-full flex items-center justify-center font-black
                                  cursor-pointer'>+</button>
               </div>
            <div className='h-[150px] p-3 flex flex-row flex-wrap overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                  {Tags?.map((t , index) => <span className='p-2 rounded-full bg-[#000000] shadow-[inset_1px_1px_15px_1px_#398be2] text-[9px] 
                  min-w-[50px] h-[20px] flex items-center justify-center cursor-pointer'
                   key={index} onClick={(e)=>{removeTag(e.currentTarget.innerText)}} >{t}</span>)}
            </div>
          </div>

          <label className='flex flex-col gap-1 w-[45%]'>
            <small className='opacity-75'>Description</small>
            <textarea onChange={(e)=>{setDescription(e.currentTarget.value)}} 
            className='grow outline-none rounded-lg bg-[#0425529f] h-[150px] px-4 border-2 border-[#b4c2d54c]'
            name="description" rows={3}></textarea>
          </label>
          
         </div>


          <div className='flex flex-row items-center justify-center gap-5'>
            <label className='flex flex-col items-center'>

              <small className='opacity-75 text-[8px]'>Priority</small>
              <select onChange={(e)=>{setPriority(e.currentTarget.value)}} 
              className='grow outline-none rounded-full bg-[#0425529f] h-[40px] px-4 border-[.5px] border-[#b4c2d54c]
                                  shadow-[inset_2px_2px_20px_5px_#0068fa]'
              name="priority" >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

            </label>

            <label className='flex flex-col items-center'>

              <small className='opacity-75 text-[8px]'>Member</small>
              <select onChange={(e)=>{setMember(e.currentTarget.value)}} 
              className='grow outline-none rounded-full bg-[#0425529f] h-[40px] px-4 border-[.5px] border-[#b4c2d54c]
                                  shadow-[inset_2px_2px_20px_5px_#0068fa]'
              name="priority"
              >
                <option value={""} disabled >pick a memmber</option>
                 {Members?.map((m, index) =>{
                  return   <option value={m.name} key={index}>{m.name}</option>
                })}
              </select>

            </label>

            <label className='flex flex-col items-center'>

              <small className='opacity-75 text-[8px]'>Status</small>
              <select onChange={(e)=>{setStatus(e.currentTarget.value)}} 
              className='grow outline-none rounded-full bg-[#0425529f] h-[40px] px-4 border-[.5px] border-[#b4c2d54c]
                                  shadow-[inset_2px_2px_20px_5px_#0068fa]'
              name="priority" >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>

          </div>

        </div>

        <div className='flex flex-row items-center justify-center gap-3'>
          <button type='button' 
          onClick={_ =>{}}
          className='w-[200px] h-[40px] rounded-lg outline-none border-2 border-[#0068fa] text-[#0068fa]'>Cancel</button>
          <button type='button'
            onClick={_ => {saveData()}}
           className='w-[200px] h-[40px] rounded-lg outline-none bg-[#0068fa]'>Save</button>
        </div>
    </form>
  )
}
