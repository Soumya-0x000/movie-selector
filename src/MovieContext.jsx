import React, { createContext, useState, useContext } from 'react';
import { movieData } from './data/data';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState(movieData);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const filterMovies = () => {
        const filteredMovies = movieData.filter(movie => {
            const ratingMatch = selectedRatings.length === 0 
                || selectedRatings.includes(movie.rating);
            const genreMatch = selectedGenres.length === 0 
                || selectedGenres.includes(movie.category);
            return ratingMatch && genreMatch;
        });
        setMovies(filteredMovies);
    };

    const handleRatingChange = (ratings) => {
        setSelectedRatings(ratings);
        // setMovies([])
    };
    
    const handleGenreChange = (genres) => {
        setSelectedGenres(genres);
        // setMovies([])
    };

    return (
        <MovieContext.Provider value={{ 
            movies, 
            selectedRatings, 
            selectedGenres, 
            filterMovies, 
            handleRatingChange, 
            handleGenreChange 
        }}>
            {children}
        </MovieContext.Provider>
    );
};
