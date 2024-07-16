import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App1() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://freetestapi.com/api/v1/movies');
                setMovies(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="App">
           
            <main className="App-main">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <div className="movie-list">
                        {movies.map(movie => (
                            <div key={movie.id} className="movie-card">
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
                        ))}
                    </div>
                )}
            </main>
            <footer className="App-footer">
                <p>&copy; 2024 My Movie Website. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App1;
