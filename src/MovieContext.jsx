import React, { createContext, useState, useContext, useEffect } from 'react';
import { movieData } from './data/data';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState(movieData);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filterMovies = () => {
        const filteredMovies = movieData.filter(movie => {
            const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes("Any Rating") || selectedRatings.some(rating => Math.floor(movie.rating) === rating);
            const genreMatch = selectedGenres.length === 0 || selectedGenres.includes("Any Genre") || selectedGenres.includes(movie.category);
            const searchMatch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
            return ratingMatch && genreMatch && searchMatch;
        });
        setMovies(filteredMovies);
    };

    useEffect(() => {
        filterMovies();
    }, [selectedRatings, selectedGenres, searchQuery]);

    const handleRatingChange = (ratings) => {
        setSelectedRatings(ratings);
    };

    const handleGenreChange = (genres) => {
        setSelectedGenres(genres);
    };

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
    };

    return (
        <MovieContext.Provider value={{ 
            movies, 
            selectedRatings, 
            selectedGenres, 
            searchQuery,
            handleRatingChange, 
            handleGenreChange,
            handleSearchQueryChange 
        }}>
            {children}
        </MovieContext.Provider>
    );
};
