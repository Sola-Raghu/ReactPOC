import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '../../types';
import styles from './MovieDetails.module.css';
import { mockMovies } from '../../data/MockData';

const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const navigate = useNavigate();

    console.log("Rendering MovieDetails for movie ID:", id);

    useEffect(() => {
        const movieData = mockMovies.find((movie: Movie) => movie.id === parseInt(id || '', 10));
        setMovie(movieData || null);
    }, [id]);

    if (!movie) {
        return <p>Movie not found</p>;
    }

    const clampedRating = Math.max(0, Math.min(5, Math.round(movie.rating || 0)));

    return (
        <div className={styles.movieDetails}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>← Back</button> {/* Back button */}
            <img src={movie.poster || 'https://via.placeholder.com/500x750/cccccc/969696.png?text=No+Image'} alt={movie.title} className={styles.poster} />
            <h1>{movie.title}</h1>
            <p><strong>Genre:</strong> {movie.genre || 'N/A'}</p>
            <p><strong>Rating:</strong> <span className={styles.rating}>{'★'.repeat(clampedRating)}{'☆'.repeat(5 - clampedRating)}</span></p>
            <p><strong>Year:</strong> {movie.year || 'N/A'}</p>
            <p><strong>Plot:</strong> {movie.plot || 'N/A'}</p>
        </div>
    );
};

export default MovieDetails;