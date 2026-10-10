const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

async function requestMovies(path, signal) {
  if (!API_KEY || !BASE_URL) {
    throw new Error("Movie data isn't configured yet. Check VITE_API_KEY and VITE_BASE_URL in your environment.");
  }

  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`${BASE_URL.replace(/\/$/, "")}${path}${separator}api_key=${encodeURIComponent(API_KEY)}`, { signal });
  if (!response.ok) {
    throw new Error(response.status === 401 ? "The movie service rejected its API key." : "The movie service is unavailable. Please try again.");
  }

  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
}

export const getPopularMovies = (signal) => requestMovies("/movie/popular", signal);
export const searchMovies = (query, signal) => requestMovies(`/search/movie?query=${encodeURIComponent(query)}`, signal);
