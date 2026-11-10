
export default function FilterCards({searchTerm, priorityFilter, memberFilter}) {
  return (
    <form className="flex flex-row justify-center items-center gap-[2vw] mt-5">
        <input className="bg-[#18253B] w-[30%] outeline-none border-none h-[40px] rounded-lg px-5" 
            type="text" placeholder="search for card" name="searchTerm" />
        <select className="cursor-pointer bg-[#18253B] w-[20%] outeline-none border-none h-[40px] rounded-lg px-5"  >
            <option value="all">All properites</option>
        </select>
        <select className="cursor-pointer bg-[#18253B] w-[20%] outeline-none border-none h-[40px] rounded-lg px-5" >
            <option value="all">All members</option>
        </select>
        <button className="border-[#71829D] border-[.5px] w-[100px] h-[40px] rounded-lg">Reset</button>
    </form>
  )
}
