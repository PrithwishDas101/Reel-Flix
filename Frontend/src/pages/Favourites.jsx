import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext.jsx";
import MovieCard from "../components/MovieCard.jsx";
import "../css/Favourites.css";

function Favourites() {
  const { favourites } = useMovieContext();

  return (
    <section className="favourites" aria-labelledby="watchlist-title">
      <div className="favourites-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> YOUR PERSONAL COLLECTION</p>
        <h1 id="watchlist-title">Saved for <span>later.</span></h1>
        <p className="favourites-intro">The films you want to return to, all in one place.</p>
      </div>
      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <div className="empty-reel" aria-hidden="true"><span>R</span></div>
          <p className="eyebrow">A COLLECTION IN THE MAKING</p>
          <h2>Every great watchlist starts somewhere.</h2>
          <p>Save a film when something catches your eye. It’ll be here when you’re ready.</p>
          <Link to="/" className="primary-action">Explore films <span aria-hidden="true">↗</span></Link>
        </div>
      ) : (
        <>
          <div className="watchlist-meta"><h2>Your watchlist<span className="heading-period">.</span></h2><span>{favourites.length.toString().padStart(2, "0")} SAVED</span></div>
          <div className="movies-grid">
            {favourites.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
          </div>
        </>
      )}
    </section>
  );
}

export default Favourites;
