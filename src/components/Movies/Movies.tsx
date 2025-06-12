import React, { useState, useEffect, useMemo, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { Movie } from '../../types';
import { mockMovies, movieGenres } from '../../data/MockData';
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from './Movies.module.css';

const Movies: React.FC = () => {
    const [allMovies] = useState<Movie[]>(mockMovies); 
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(allMovies);


    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
    const [selectedGenre, setSelectedGenre] = useState<string>(''); 

    const debouncedSearch = useMemo(
        () =>
            debounce((term: string) => {
                setSearchTerm(term.toLowerCase());
            }, 300),
        []
    );

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value);
    }, [debouncedSearch]);

    useEffect(() => {
        let result: Movie[] = allMovies;

        if (searchTerm) {
            result = result.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm)
            );
        }

        if (selectedGenre) {
             result = result.filter(movie =>
                movie.genre === selectedGenre
            );
        }

        setFilteredMovies(result);

    }, [searchTerm, selectedGenre, allMovies]); 

    const handleGenreSelect = (genre: string) => {
        setSelectedGenre(genre);
        setShowFilterDropdown(false);
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);


    return (
        <div className={styles.moviesPage}>
            <h2>Movies</h2>
            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search movies by title..."
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
                <div className={styles.filterContainer}>
                    <button
                        onClick={() => setShowFilterDropdown(prev => !prev)}
                        className={styles.filterButton}
                        disabled={movieGenres.length === 0}
                    >
                        Filter {selectedGenre ? `(${selectedGenre})` : 'by Genre'}
                    </button>
                    {showFilterDropdown && (
                        <div className={styles.filterDropdown}>
                            <button onClick={() => handleGenreSelect('')}>All Genres</button>
                            {movieGenres.map(genre => (
                                <button key={genre} onClick={() => handleGenreSelect(genre)}>
                                    {genre}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {filteredMovies.length > 0 ? (
                <div className={styles.movieGrid}>
                    {filteredMovies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            ) : (
                 <div className={styles.message}>
                    No movies found {searchTerm || selectedGenre ? 'matching your criteria.' : '.'}
                 </div>
            )}
        </div>
    );
};

export default Movies;