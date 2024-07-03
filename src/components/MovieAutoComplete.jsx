import React from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import ReactStars from "react-rating-stars-component";
import { useMovieContext } from '../MovieContext';

const MovieAutoComplete = () => {
    const { movies, searchQuery, handleSearchQueryChange, selectedRatings, selectedGenres } = useMovieContext();
    const [selectedMovie, setSelectedMovie] = React.useState(null);

    const handleInputChange = (event, newInputValue) => {
        handleSearchQueryChange(newInputValue);
    };

    const handleChange = (event, newValue) => {
        setSelectedMovie(newValue);
    };

    React.useEffect(() => {
        if (selectedMovie) {
            const ratingMatch = selectedRatings.includes("Any Rating") || selectedRatings.includes(selectedMovie.rating);
            const genreMatch = selectedGenres.includes("Any Genre") || selectedGenres.includes(selectedMovie.category);
            if (!ratingMatch || !genreMatch) {
                setSelectedMovie(null);
            }
        }
    }, [selectedRatings, selectedGenres]);

    return (
        <Autocomplete
            id="movie-select-demo"
            sx={{ 'inline-size': 500 }}
            options={movies}
            autoHighlight
            getOptionLabel={(option) => option.title}
            inputValue={searchQuery}
            onInputChange={handleInputChange}
            value={selectedMovie}
            onChange={handleChange}
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
                                activeColor="#36CB68"
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
