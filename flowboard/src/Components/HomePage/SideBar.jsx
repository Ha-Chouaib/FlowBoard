import { Link } from "react-router-dom"
import canbanLogo from '../../Assets/canbanLogo.png';

export default function SideBar() {
  return (
    <div className="bg-[#0B1426] h-[100vh] w-[300px] rounded-r-lg [grid-area:sidebar]">
        <figure className="flex flex-col items-center justify-center gap-2 border-b-2 border-blue-500
         py-5 rounded-lg">
            <img src={canbanLogo} className="w-[10vmin] h-[10vmin]" alt="Logo" />
            <h1 className="font-black text-[2rem]">Kanban<span className="text-blue-600 ">Pro</span></h1>
        </figure>
        <ul className="flex flex-col justify-center gap-3 h-[40vh] px-5">
            <li className="w-[100%]"><Link className="bg-[#0866F5] rounded-lg inline-block px-3 py-4 w-[100%]" to={"/"}>Board</Link></li>
            <li className="w-[100%]"><Link className="opacity-50 inline-block px-3 py-4 w-[100%]" to={"/"}>My Tasks</Link></li>
            <li className="w-[100%]"><Link className="opacity-50 inline-block px-3 py-4 w-[100%]" to={"/"}>Parameters</Link></li>
        </ul>
    </div>
  )
}
