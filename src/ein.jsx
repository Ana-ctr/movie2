import React, { useState, useEffect } from "react";
import axios from "axios";
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
    const response = await axios.get(url);

    if (response.status === 200) {
      setMovies(response.data);
      setLoading(false);
    } else {
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
                  <h5>{movie.title}</h5>
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

export default Lesson;
