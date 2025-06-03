import { useState } from "react";
import Search from "./components/Search";


const App = () =>{

  const [ searchTerm, setSearchTerm ] = useState('');


  return(
   <main className="pattern">

    <div className="wraper">
     <header>
     <img src="./hero.png" alt="Hero Banner" />
      <h1>Find <span className=" text-gradient">Movies</span> You'l enjoy</h1>
     </header>

     <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     <h1 className="text-xl text-white">{searchTerm}</h1>
    </div>

   </main>
  )
}


export default App;