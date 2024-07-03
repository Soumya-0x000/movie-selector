import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ReactStars from "react-rating-stars-component";
import { useMovieContext } from '../MovieContext';

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

const RatingBtn = () => {
    const { selectedRatings, handleRatingChange } = useMovieContext();
    const ratingOptions = ["Any Rating", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handleChange = (event) => {
        const { target: { value } } = event;
        handleRatingChange(value);
    };

    return (
        <div>
            <FormControl sx={{ 'inline-size': 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Rating</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedRatings}
                    onChange={handleChange}
                    input={<OutlinedInput label="Rating" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}>
                    {ratingOptions.map((rating) => (
                        <MenuItem key={rating} value={rating}>
                            <Checkbox checked={selectedRatings.indexOf(rating) > -1} />
                            <ListItemText primary={rating} />
                            {typeof rating === 'number' && (
                                <ReactStars
                                    count={10}
                                    value={rating}
                                    size={22}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#36CB68"
                                    edit={false}
                                />
                            )}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default RatingBtn;
