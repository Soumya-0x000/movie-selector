import React from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import ReactStars from "react-rating-stars-component";
import { useMovieContext } from '../MovieContext';

const MovieAutoComplete = () => {
    const { movies, selectedRatings, selectedGenres, filterMovies } = useMovieContext();

    // Function to filter movies based on selected ratings and genres
    const filterMoviesLocal = () => {
        return movies.filter(movie => {
            const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(movie.rating);
            const genreMatch = selectedGenres.length === 0 || selectedGenres.includes(movie.category);
            return ratingMatch && genreMatch;
        });
    };

    // Initial filtered movies
    const filteredMovies = filterMoviesLocal();

    return (
        <Autocomplete
            id="movie-select-demo"
            sx={{ width: 500 }}
            options={filteredMovies}
            autoHighlight
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <Box
                        key={key}
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...optionProps}>
                        <div className='flex flex-col w-full'>
                            <div className='flex justify-between w-full'>
                                <span className='font-mono text-[1.05rem]'>{option.title}</span>
                                <span className='text-gray-600 font-mono text-sm'>
                                    {option.category}
                                </span>
                            </div>
                            <ReactStars
                                count={10}
                                value={option.rating}
                                size={24}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#D6DC09"
                                edit={false}
                            />
                        </div>
                    </Box>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a movie"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: true,
                    }}
                />
            )}
        />
    );
};

export default MovieAutoComplete;
