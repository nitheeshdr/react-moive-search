import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import PersonDetails from "./PersonDetails";
import FullCastAndCrew from "./FullCastAndCrew";  // Import FullCastAndCrew component

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_TMDB_API_KEY;// TMDb API key

  const searchMovies = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      if (response.data.results.length > 0) {
        setMovies(response.data.results);
      } else {
        setError("No results found.");
        setMovies([]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center py-8">
        <h1 className="text-4xl font-bold mb-8">TMDb Movie Search App</h1>

        <Routes>
          {/* Homepage: Search Movies */}
          <Route
            path="/"
            element={
              <>
                <form onSubmit={searchMovies} className="mb-6 w-full max-w-md">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-4 text-black rounded-md"
                    placeholder="Search for movies..."
                  />
                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 p-4 rounded-md"
                  >
                    Search
                  </button>
                </form>

                {error && <p className="text-red-500">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {movies.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      className="bg-gray-900 p-4 rounded-lg shadow-lg flex flex-col items-center cursor-pointer"
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : "https://via.placeholder.com/300"
                        }
                        alt={movie.title}
                        className="w-full h-64 object-cover mb-4"
                      />
                      <h3 className="text-xl font-bold">{movie.title}</h3>
                      <p className="mt-2">{movie.release_date}</p>
                    </Link>
                  ))}
                </div>
              </>
            }
          />

          {/* Movie Details Page */}
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* Person Details Page (for cast) */}
          <Route path="/person/:id" element={<PersonDetails />} />

          {/* Full Cast and Crew Page */}
          <Route path="/movie/:id/cast-crew" element={<FullCastAndCrew />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
