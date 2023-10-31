import { useState, useEffect } from "react";
import React from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

// api key = 7f6d5f26
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=7f6d5f26';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Searching movie with the api
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    // this hooks will run every site refresh
    useEffect(()=>{
        searchMovies('Batman');
    }, []);

    return (
        <div className="app">
            <h1>MovieDetes</h1>

            <div className="search">
            <input
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}/>
            </div>

            {/* // This is for the movie card loops */}
            {movies?.length > 0
                ?(
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ):(
                    <div className="empty">
                        <h2>No Movies found</h2>    
                    </div>
                )
            }
        </div>
    );
}

export default App;