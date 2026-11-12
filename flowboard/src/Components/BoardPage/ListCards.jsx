import { useEffect, useState } from "react";
import Card from "../Card"
export default function ListCards({cards}) {


    const [bgColor , setBgColor] = useState("");
    const [brushColor , setBrushColor] = useState("");
    const [cardsCount , setCardsCount] = useState(0);
    const [listTitle , setListTitle] = useState("------");

    useEffect(()=>{
        setCardsCount(cards?.length ?? 0)
        switch(cards[0]?.status)
        {
            case "todo":
                setBgColor("#0057fa12");
                setBrushColor("#3B82F6");
                setListTitle("To Do");
                break;
            case "in-progress":
                setBgColor("#f57b012f");
                setBrushColor("#f57b01");
                setListTitle("In progress");
                break;
            case "done":
                setBgColor("#00bc1033");
                setBrushColor("#00bc10fd");
                setListTitle("Done");
                break;
            default :
                setBgColor("black");
                setBrushColor("#3B82F6");
                setListTitle("InComing tastks");
            break;

        }
    },[cards]);
    

    if(cards.length === 0)
    {
        return(
            <div className="bg-[#0057fa12] min-h-[200px] min-w-[250px] w-[30%] rounded-[15px] border-t-[3px]  border-[#3B82F6]
                        shadow-[inset_0_0px_2px_2px_#3B82F6] max-h-[80vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                        flex items-center justify-center">
                <p className="px-10 py-5 bg-zinc-950 rounded-full opacity-80">No tasks avialable to be listed</p>
            </div>
        );
    }

  return (
    <section className={`min-h-[200px] min-w-[250px] w-[30%] rounded-[15px] border-t-[3px] max-h-[70vh]
                        `}
                        style={{
                            backgroundColor:bgColor,
                            borderColor: brushColor,
                            boxShadow:`inset 0 0px 2px 2px ${brushColor}`
                        }}>
        <div className="px-5 py-2 flex flex-row items-center gap-4">
            <span className= {`inline-block w-[15px] h-[15px] rounded-full`}
                    style={{
                            backgroundColor: brushColor
                            }}></span>
            <small className="ml-5 font-bold text-[17px]">{listTitle}</small>
            <small className={`w-[30px] h-[30px] flex items-center justify-center
                                rounded-full font-semibold`}
                                style={{
                                    backgroundColor: brushColor
                                }}>{cardsCount}</small>
        </div>
        <div className="px-3 flex flex-col gap-4 max-h-[63vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {cards.map((c,index)=>{
                return <Card card ={c} key={index}/>
            })}
        </div>

    </section>
  )
}
