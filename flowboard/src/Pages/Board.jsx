
import Header from "../Components/BoardPage/Header"
import FilterCards from "../Components/BoardPage/FilterCards"
export default function Board() {
  return (
    <div className="[grid-area:main] ">
        <Header/>
        <FilterCards/>
    </div>
  )
}
