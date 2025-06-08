import { useEffect, useState } from "react";
import { useDebounce } from 'react-use'
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Footer from "./components/Footer";
import { UpdateSearchCount } from "./appwirte";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  useDebounce(() =>setDebounceSearchTerm(searchTerm), 500, [searchTerm])
  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint =  query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("failed to fetch movies");
      }

      const data = await response.json();
      if (response == "false") {
        setErrorMessage(data.Error || "failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      UpdateSearchCount();
    } catch (err) {
      console.error(`Error Fetching movies: ${err}`);
      setErrorMessage("error fetching movies. please try again");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  return (
    <main className="pattern">
      <div className="wraper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className=" text-gradient">Movies</span> You'l enjoy
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="space-y-9">
          <h2 className="mt-[40px]">All movies</h2>
          { isLoading ? (
            <Spinner />
          ) : errorMessage ? (

            <p className=" text-red-500">{errorMessage}</p>

          ) :(
            <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {
               movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              }
            </ul>
          )}
        </section>
      </div>


      <Footer />
    </main>
  );
};

export default App;
