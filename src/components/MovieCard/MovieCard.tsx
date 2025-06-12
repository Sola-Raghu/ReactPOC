import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../types';
import styles from './MovieCard.module.css';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const navigate = useNavigate();
    const imageUrl = movie.poster || 'https://via.placeholder.com/500x750/cccccc/969696.png?text=No+Image';

    const handleCardClick = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate(`/dashboard/movies/${movie.id}`);
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <img
                src={imageUrl}
                alt={movie.title || 'Movie Poster'}
                className={styles.image}
                loading="lazy"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://via.placeholder.com/500x750/cccccc/969696.png?text=No+Image';
                }}
            />
            <div className={styles.content}>
                <h3 className={styles.title}>{movie.title || 'N/A'}</h3>
                {movie.plot && (
                    <p className={`${styles.details} ${styles.plot}`}>
                        {movie.plot.substring(0, 80)}{movie.plot.length > 80 ? '...' : ''}
                    </p>
                )}
                {typeof movie.rating === 'number' && (
                    <p className={styles.details}>
                        Rating: {movie.rating.toFixed(1)}
                    </p>
                )}
                {movie.year && (
                    <p className={styles.details}>
                        Year: {movie.year}
                    </p>
                )}
                {movie.genre && (
                    <p className={styles.details}>
                        Genre: {movie.genre}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MovieCard;