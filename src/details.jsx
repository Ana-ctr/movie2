
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://freetestapi.com/api/v1/movies/${id}`);
      if (response.status === 200) {
        setMovie(response.data);
        setLoading(false);
      } else {
        setError('Failed to fetch movie');
        setLoading(false);
      }
    } catch (error) {
      setError('Failed to fetch movie');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching movie: {error}</div>;

  return (
    <div className="App text-dark img">
      <header>
        <h1>Фильм Детали</h1>
      </header>
      <main>
        {movie && (
          <div className="movie-details">
            <img width={'90%'} height={'280px'} src={movie.poster} alt={movie.title} />
            <h5>{movie.title}</h5>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Genre:</strong> {movie.genre.join(', ')}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
            <p><strong>Plot:</strong> {movie.plot}</p>
            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
            <p><strong>Awards:</strong> {movie.awards}</p>
            <p><strong>Country:</strong> {movie.country}</p>
            <p><strong>Language:</strong> {movie.language}</p>
            <p><strong>Box Office:</strong> {movie.boxOffice}</p>
            <p><strong>Production:</strong> {movie.production}</p>
            <p><strong>Website:</strong> <a href={movie.website} target="_blank" rel="noopener noreferrer">{movie.website}</a></p>
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MovieDetails;
