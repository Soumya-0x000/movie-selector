import React, { useMemo } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useMovieContext } from '../MovieContext';
import { movieData } from '../data/data';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            'block-size': ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            'inline-size': 250,
        },
    },
};

const MovieGenre = () => {
    const { selectedGenres, handleGenreChange } = useMovieContext();

    const genres = useMemo(() => {
        const uniqueGenres = Array.from(new Set(movieData.map(movie => movie.category)));
        return ["Any Genre", ...uniqueGenres];
    }, []);

    const handleChange = (event) => {
        const { target: { value } } = event;
        if (value.includes('Any Genre')) {
            handleGenreChange(['Any Genre']);
        } else {
            handleGenreChange(value);
        }
    };

    return (
        <div>
            <FormControl sx={{ 'inline-size': 200 }}>
                <InputLabel id="demo-multiple-checkbox-label">Genre</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedGenres}
                    onChange={handleChange}
                    input={<OutlinedInput label="Genre" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}>
                    {genres.map((genre) => (
                        <MenuItem key={genre} value={genre}>
                            <Checkbox checked={selectedGenres.indexOf(genre) > -1} />
                            <ListItemText primary={genre} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default MovieGenre;
