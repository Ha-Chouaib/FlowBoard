
export default function Header() {
  return (
    <header className="px-5 py-2 flex flex-row justify-between items-center border-b-[.2px] border-color-[#293A55]">
        <div>
            <h2 className="font-bold text-[2rem]">My Kanban Board</h2>
            <small className="opacity-80 text-[1rem]">Organize tasks <span className="text-[#2583FF] font-black">/</span> Track progress</small>
        </div>
        <button className="bg-[#0866F5] rounded-lg px-5 py-3 h-[50px]">+ New card</button>
    </header>
  )
}
