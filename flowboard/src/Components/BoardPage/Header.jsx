
export default function Header({OpenAddNewCardWindow ,OpenAddAIWindow}) {
  return (
    <header className=" px-5 py-2 mt-5 flex flex-row sm:justify-center lg:justify-between items-center border-b-[.2px] border-color-[#293A55] flex-wrap gap-2">
        <div className="min-w-[300px]">
            <h2 className="font-bold text-[2rem]">My Kanban Board</h2>
            <small className="opacity-80 text-[1rem]">Organize tasks <span className="text-[#2583FF] font-black">/</span> Track progress</small>
        </div>
        <div className="flex gap-2 min-w-[fit-content]">
            <button onClick={()=>{OpenAddAIWindow(true)}} className="bg-[#0866F5] rounded-lg px-5 py-3 h-[50px]">Generate Tasks with AI</button>
            <button onClick={()=>{OpenAddNewCardWindow(true)}} className="bg-[#0866F5] rounded-lg px-5 py-3 h-[50px]">+ New card</button>
        </div>
       
    </header>
  )
}
