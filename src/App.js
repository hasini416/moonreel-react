import { useEffect, useState } from "react";

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
//4a869755

const API_URL = 'http://www.omdbapi.com?apikey=4a869755';

// const movie1 = {
//     "Title": "Harry Potter and the Sorcerer's Stone",
//     "Year": "2001",
//     "imdbID": "tt0241527",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNTU1MzgyMDMtMzBlZS00YzczLThmYWEtMjU3YmFlOWEyMjE1XkEyXkFqcGc@._V1_SX300.jpg"
// }

const App = () => {

    const [movies, SetMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        SetMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('');
    }, []);

    return (
        <div className="app">
            <h1>MoonReel</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">

                            {searchTerm === ''
                                ? <h2>Search for a movie to begin! 🍿</h2>
                                : <h2>No movies Found!</h2>
                            }

                        </div>
                    )
            }
        </div>
    );
}

export default App;