import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams(); // Movie ID from URL
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "8a138c7071b8253c505a486b9af1d1f3";

  useEffect(() => {
    // Fetch movie details
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        );
        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        setError("Something went wrong while fetching movie details.");
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
      {movie ? (
        <>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://via.placeholder.com/300"
            }
            alt={movie.title}
            className="w-full h-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>

          {credits && (
            <div>
              <p><strong>Director:</strong> {credits.crew.find((person) => person.job === "Director")?.name}</p>
              {/* Link to Full Cast and Crew Page */}
              <Link
                to={`/movie/${id}/cast-crew`}
                className="mt-4 bg-blue-500 hover:bg-blue-600 p-2 rounded-md block text-center"
              >
                View Full Cast and Crew
              </Link>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetails;
