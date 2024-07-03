import React, { createContext, useState, useEffect, useContext } from 'react';
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
            const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(movie.rating));
            const genreMatch = selectedGenres.length === 0 || selectedGenres.includes(movie.category);
            return ratingMatch && genreMatch;
        });

        setMovies(filteredMovies);

        if (selectedMovie) {
            const isMovieMatching = filteredMovies.some(movie => movie.title === selectedMovie.title);
            if (!isMovieMatching) {
                setSelectedMovie(null);
            }
        }
    };

    useEffect(() => {
        filterMovies();
    }, [selectedRatings, selectedGenres]);

    const handleRatingChange = (ratings) => {
        setSelectedRatings(ratings);
    };

    const handleGenreChange = (genres) => {
        setSelectedGenres(genres);
    };

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <MovieContext.Provider value={{ 
            movies, 
            selectedRatings, 
            selectedGenres, 
            selectedMovie,
            handleRatingChange, 
            handleGenreChange, 
            handleMovieSelect 
        }}>
            {children}
        </MovieContext.Provider>
    );
};
