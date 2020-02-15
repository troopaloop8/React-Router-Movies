import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard.js';

const Movie = (props) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          console.log(response.data);
          setMovie(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[props.match.params]);

  // Uncomment this only when you have moved on to the stretch goals
  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie)
  }
  const { title, director, metascore, stars } = movie;
  if (!movie || !stars) {
    return <div>Loading movie information...</div>;
  }
 
  return (
    <MovieCard title={title} director={director} metascore={metascore} stars={stars} saveMovie={saveMovie} />
  );
}

export default Movie;
