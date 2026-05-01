import "../css/Favourites.css";
import { useMovieContext } from "../contexts/MovieContext.jsx";
import MovieCard from "../components/MovieCard.jsx";

function Favourites() {
    const { favourites } = useMovieContext();

    return (
        <div className="favourites">
            {favourites.length === 0 ? (
                <div className="favourites-empty">
                    <h2><b>No favourite movies yet</b></h2>
                    <p>Add movies to your favourites to see them here.</p>
                </div>
            ) : (
                <>
                    <h2>Your Favourites</h2>
                    <div className="movies-grid">
                        {favourites.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Favourites;