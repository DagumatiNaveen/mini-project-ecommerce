import React, { useState } from "react";
import "./MovieSearch.css";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 3) {
      setError("Please enter at least 3 characters.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(trimmedQuery)}&type=movie&apikey=564727fa`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error || "No results found.");
        return;
      }

      setMovies(Array.isArray(data.Search) ? data.Search : []);
    } catch (e) {
      setMovies([]);
      setError("Unable to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  return (
    <div className="movie-container">
      <h2 className="page-title">Movie Search</h2>
      <div className="search-bar">
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search movies..."
          aria-label="Search movies"
        />
        <button className="search-btn" onClick={searchMovies} disabled={loading} aria-busy={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner">🔎</div>
          <p>Searching movies...</p>
        </div>
      ) : movies.length === 0 && !error ? (
        <div className="empty-state">No movies yet. Try a search!</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                className="movie-poster"
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.Title}
              />
              <p className="movie-title">{movie.Title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default MovieSearch;
