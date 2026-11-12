import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Board from './Pages/Board';
import SideBar from './Components/HomePage/SideBar';
import CardsListProvider from './Contexts/CardsContext';
function App() {
  return (
    <div className="bg-[#080F1E] max-h-screen grid grid-cols-[auto_1fr_1fr] grid-rows-[1fr_1fr_50px] 
    [grid-template-areas:'sidebar_main_main''sidebar_main_main''sidebar_main_main'] text-[white]
    gap-1">
      <BrowserRouter>
      <SideBar/>

      <CardsListProvider>
        
        <Routes>
          <Route path='/' element={<Board/>} />
        </Routes>
        
        </CardsListProvider>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
