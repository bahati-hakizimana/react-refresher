const Search = ({searchTerm, setSearchTerm}) =>{

    return(
        <div className="search">
            <div>
                <img src="./search.svg" alt="Search img" />
                <input 
                type="text"
                 value={searchTerm}
                  placeholder="search movie in Thousands of Movies"
                  onChange={(e) =>setSearchTerm(e.target.value)}
                   />
            </div>
        </div>
    )

}
export default Search;