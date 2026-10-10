import { useEffect, useMemo, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import { getPopularMovies, searchMovies } from "../services/api.js";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [retryToken, setRetryToken] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const query = searchQuery.trim();

    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const results = query
          ? await searchMovies(query, controller.signal)
          : await getPopularMovies(controller.signal);
        setMovies(Array.isArray(results) ? results : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "We couldn't load movies right now.");
          setMovies([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, query ? 300 : 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery, retryToken]);

  const sortedMovies = useMemo(() => {
    const list = [...movies];
    if (sortBy === "rating") return list.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    if (sortBy === "newest") return list.sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""));
    return list;
  }, [movies, sortBy]);

  const clearSearch = () => setSearchQuery("");

  return (
    <div className="home">
      <section className="discover-hero" aria-labelledby="discover-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> THE FILM INDEX <span className="eyebrow-divider">/</span> VOL. 01</p>
          <h1 id="discover-title">Find your<br /><span>next favourite.</span></h1>
          <p className="hero-description">A considered collection of films worth your time. Explore what's popular, follow a feeling, and keep the ones you want to remember.</p>
          <a className="hero-link" href="#film-collection">Explore the collection <span aria-hidden="true">↘</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-frame art-frame-back"><span>FRAME<br />NO. 02</span></div>
          <div className="art-frame art-frame-front"><span className="art-circle" /><span className="art-type">STAY<br />FOR THE<br /><i>STORY.</i></span><span className="art-bottom">A FILM IS A FEELING</span></div>
          <span className="art-index">REEL / 001—026</span>
        </div>
      </section>

      <section className="collection-section" id="film-collection" aria-labelledby="collection-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR NEXT TWO HOURS</p>
            <h2 id="collection-title">{searchQuery.trim() ? "Search results" : "Popular right now"}<span className="heading-period">.</span></h2>
          </div>
          <p className="collection-note">{loading ? "Finding films…" : `${sortedMovies.length} ${sortedMovies.length === 1 ? "film" : "films"} in the collection`}</p>
        </div>

        <div className="collection-tools">
          <form className="search-form" role="search" onSubmit={(event) => event.preventDefault()}>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <label className="visually-hidden" htmlFor="movie-search">Search films</label>
            <input
              id="movie-search"
              type="search"
              placeholder="Titles, moods, people…"
              className="search-input"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            {searchQuery && <button type="button" className="clear-search" onClick={clearSearch} aria-label="Clear search">×</button>}
          </form>
          <label className="sort-control">
            <span>Sort by</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort films">
              <option value="popular">Popular</option>
              <option value="rating">Top rated</option>
              <option value="newest">Newest</option>
            </select>
          </label>
        </div>

        {error && (
          <div className="state-panel error-panel" role="alert">
            <span className="state-symbol">!</span>
            <h3>We lost the picture.</h3>
            <p>{error}</p>
            <button className="text-action" onClick={() => setRetryToken((value) => value + 1)}>Try again <span aria-hidden="true">↗</span></button>
          </div>
        )}

        {loading ? (
          <div className="movies-grid" aria-label="Loading films" aria-busy="true">
            {Array.from({ length: 10 }, (_, index) => <div className="movie-skeleton" key={index}><div className="skeleton-poster" /><div className="skeleton-line" /><div className="skeleton-line short" /></div>)}
          </div>
        ) : !error && sortedMovies.length === 0 ? (
          <div className="state-panel">
            <span className="state-symbol">⌕</span>
            <h3>No films found.</h3>
            <p>Try another title or a shorter search.</p>
            {searchQuery && <button className="text-action" onClick={clearSearch}>Clear search <span aria-hidden="true">↗</span></button>}
          </div>
        ) : !error ? (
          <div className="movies-grid">
            {sortedMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
          </div>
        ) : null}
      </section>
      <footer className="home-footer"><span>REEL FLIX — A PERSONAL FILM INDEX</span><span>KEEP THE GOOD STORIES CLOSE.</span></footer>
    </div>
  );
}

export default Home;
