import {useEffect, useRef } from 'react'

export default function CardContextMenu({showContextMenu,isMenuOpen,cardActions}) {

   const menuRef = useRef(null);

  useEffect(() => {
    if (!showContextMenu) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        isMenuOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showContextMenu, isMenuOpen]);

  if (!showContextMenu) return null;

  return (
    <div ref={menuRef}
    onPointerDown={(e) => e.stopPropagation()}
    onMouseDown={(e) => e.stopPropagation()}
    onClick={(e) => e.stopPropagation()}
    className='absolute top-3 right-[50px] z-20 min-h-[150px] min-w-[300px] rounded-lg bg-[#000000ca] border-[.5px]
                    border-[#ffffff8f] flex flex-col gap-3 items-center justify-center px-5'>

                        <button  onClick={(e)=>{e.stopPropagation(); cardActions.viewDetails();isMenuOpen(false) }} className='bg-[#005ff7] w-[100%] rounded-full cursor-pointer'>view Details</button>
                        <button  onClick={(e)=>{e.stopPropagation(); cardActions.updateCard() ;isMenuOpen(false) }} className='bg-[#005ff7] w-[100%] rounded-full cursor-pointer'>update</button>
                        <button  onClick={(e)=>{e.stopPropagation(); cardActions.deleteCard() ;isMenuOpen(false) }} className='bg-[#94020e] w-[100%] rounded-full cursor-pointer'>delete</button>
                    </div>
  )
}
