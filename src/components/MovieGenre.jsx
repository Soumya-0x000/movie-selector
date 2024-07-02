import React, { Fragment, useMemo, useState } from 'react';
import { movieData } from "../data/data";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const MovieGenre = () => {
    const genres = useMemo(() => {
        const uniqueGenres = Array.from(new Set(movieData.map(movie => movie.category)));
        return ["Any Genre", ...uniqueGenres];
    }, []);

    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleChange = (event) => {
        const {target: { value }} = event;

        if (value.includes("Any Genre")) {
            setSelectedGenres(["Any Genre"]);
        } else {
            setSelectedGenres(value);
        }
    };

    return (
        <div>
            <FormControl sx={{ width: 200 }}>
                <InputLabel id="demo-multiple-checkbox-label">Genre</InputLabel>
                <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedGenres}
                onChange={handleChange}
                input={<OutlinedInput label="Rating" />}
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
}

export default MovieGenre;
