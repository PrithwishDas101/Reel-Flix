import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext.jsx";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  const { isFavourite, addToFavourites, removeFromFavourites } = useMovieContext();
  const [imageFailed, setImageFailed] = useState(false);
  const favourite = isFavourite(movie.id);
  const year = movie.release_date?.split("-")[0] || "Release date unknown";
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "";

  function onFavouriteClick(event) {
    event.preventDefault();
    if (favourite) removeFromFavourites(movie.id);
    else addToFavourites(movie);
  }

  return (
    <article className="movie-card">
      <div className="movie-poster">
        {poster && !imageFailed ? (
          <img
            src={poster}
            alt={`${movie.title || movie.name || "Film"} poster`}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="poster-fallback" aria-label="Poster unavailable"><span>RF</span><small>POSTER UNAVAILABLE</small></div>
        )}
        <div className="movie-overlay">
          <button
            className={`favourite-btn ${favourite ? "active" : ""}`}
            onClick={onFavouriteClick}
            aria-label={favourite ? `Remove ${movie.title} from watchlist` : `Save ${movie.title} to watchlist`}
            aria-pressed={favourite}
            title={favourite ? "Remove from watchlist" : "Save to watchlist"}
          >
            <span aria-hidden="true">{favourite ? "♥" : "♡"}</span>
          </button>
          <div className="poster-bottom"><span>REEL FLIX</span><span>{movie.vote_average ? `★ ${movie.vote_average.toFixed(1)}` : "FILM INDEX"}</span></div>
        </div>
      </div>
      <div className="movie-info">
        <h3 title={movie.title || movie.name}>{movie.title || movie.name || "Untitled film"}</h3>
        <p>{year}</p>
      </div>
    </article>
  );
}

export default MovieCard;
