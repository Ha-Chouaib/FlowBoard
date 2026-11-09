import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Board from './Pages/Board';
import SideBar from './Components/HomePage/SideBar';
import Footer from './Components/HomePage/Footer';
function App() {
  return (
    <div className="bg-[#080F1E] h-screen grid grid-cols-[auto_1fr_1fr] grid-rows-[1fr_1fr_50px] 
    [grid-template-areas:'sidebar_main_main''sidebar_main_main''sidebar_main_main'] text-[white]
    gap-1">
      <BrowserRouter>
      <SideBar/>
        <Routes>
          <Route path='/' element={<Board/>} />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
