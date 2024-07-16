import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from "./header";

function Lesson() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const fetchMovies = async (searchQuery = '') => {
    setLoading(true);
    setError(null);

    const url = searchQuery ? `https://freetestapi.com/api/v1/movies?search=${searchQuery}` : 'https://freetestapi.com/api/v1/movies';
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setMovies(response.data);
        setLoading(false);
      } else {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    } catch (error) {
      setError('Failed to fetch movies');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(query);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="App text-dark img">
      <header>
        <Header/>
      </header>
      <main>
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search for movies..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        {loading && <div>Loading...</div>}
        {error && <div>Error fetching movies: {error}</div>}

        {!loading && !error && (
          <section>
            <h5>Что популярно</h5>
            <div className='d-flex ex1 mt-5'>
              {movies && movies.map(movie => (
                <div key={movie.id} className="col-6 col-md-4 block p-2 mx-2 rounded-3 my-2 mb-1 col-lg-2">
                  <img width={'90%'} height={'280px'} src={movie.poster} alt={movie.title} /> <br /> <br />
                  <Link to={`/details/${movie.id}`}>
                    <h5>{movie.title}</h5>
                  </Link>
                  <p>{movie.year}</p>
                  <p>{movie.plot}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

function MovieDetails({ match }) {
  const { id } = match.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchMovie();
  }, [id]);

  return (
    <div className="App text-dark img">
      {loading && <div>Loading...</div>}
      {error && <div>Error fetching movie: {error}</div>}
      {movie && (
        <div>
          <h2>{movie.title}</h2>
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
    </div>
  );
}



export default Lesson;
