import {useEffect, useState} from 'react' 
export default function Card({card}) {
    const highBg = "#a50101";
    const mediumBg = "#f57b01";
    const lowBg = "#26c403";

    const [priorityBg, setPriorityBg] = useState(lowBg);

    useEffect(()=>{
         switch(card.priority)
    {
        case"high":
            setPriorityBg(highBg);
            break;
        case"medium":
            setPriorityBg(mediumBg);
            break;
        case"low":
            setPriorityBg(lowBg);
            break;
    }
    },[highBg,mediumBg,lowBg])
   
    return (
    <article className="bg-[#111D32] rounded-lg min-w-[200px] border-l-[5px] 
                        p-5 flex flex-row justify-between shadow-[0px_3px_7px_4px_#07070848]"
            style={{
                borderLeftColor: priorityBg
            }}>
        <div className="flex  flex-col gap-2 flex-grow-1">
            <h3>{card.title}</h3>
            <select className={`rounded-full text-[9px] font-bold px-3 w-[80px]
                                shadow-[inset_1px_1px_5px_2px_#ffffffbe] cursor-pointer`}
                    style={{
                        backgroundColor: priorityBg
                    }}>
                <option value="high">{card.priority}</option>
            </select>
            <div className="opacity-50 flex flex-row justify-between items-center text-[10px] w-[100%]">
                <small>{card.dueDate}</small> 
                <small className="bg-[#18253B] px-2 rounded-lg shadow-[0px_0px_2px_2px_#ffffff3a]">{card.assignee}</small> </div>
            </div>
        <div className="flex flex-col justify-between" >
            <button className="cursor-pointer">⋮</button>
            <span className="cursor-pointer flex items-center justify-center font-black text-[20px] bg-black w-[30px] h-[30px] rounded-full">♟</span> 
        </div>
        
    </article>
  )
}
