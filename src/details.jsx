import React, { useState, useEffect } from "react";
import axios from "axios";


function Lesson1() {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovie = async () => {
        setLoading(true);
        setError(null);

        const response = await axios.get('https://freetestapi.com/api/v1/movies/1');

        if (response.status === 200) {
            setMovie(response.data);
            setLoading(false);
        } else {
            setError('Failed to fetch movie');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching movie: {error}</div>;

    return (
        <div className="App text-dark img">
            <header>
                <h1>Добро пожаловать</h1>
                <h4>в мир фильмов, сериалов и людей. Исследуйте сейчас</h4>
            </header>
            <main>
                {movie && (
                    <div className="movie-details">
                        <img width={'90%'} height={'280px'} src={movie.poster} alt={movie.title} />
                        <h5>{movie.title}</h5>
                       
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

export default Lesson1;
