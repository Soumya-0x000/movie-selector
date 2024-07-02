import React from 'react';
import MovieAutoComplete from './components/MovieAutoComplete';
import RatingBtn from './components/RatingBtn';
import MovieGenre from './components/MovieGenre';

const App = () => {
    return (
        <div className=' flex gap-x-6 justify-center pt-10'>
            <MovieAutoComplete/>
            <RatingBtn/>
            <MovieGenre/>
        </div>
    );
}

export default App;
