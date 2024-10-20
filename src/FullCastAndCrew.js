import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function FullCastAndCrew() {
  const { id } = useParams(); // Movie ID from URL
  const [credits, setCredits] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "8a138c7071b8253c505a486b9af1d1f3";

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        );
        setCredits(creditsResponse.data);
      } catch (err) {
        setError("Something went wrong while fetching cast and crew details.");
      }
    };

    fetchCredits();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Full Cast & Crew</h2>

      {credits ? (
        <>
          {/* Display Crew */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Crew</h3>
            <ul>
              {credits.crew.map((member) => (
                <li key={member.id} className="mb-2">
                  <strong>{member.job}:</strong>{" "}
                  <Link
                    to={`/person/${member.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {member.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Display Cast */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Cast</h3>
            <ul>
              {credits.cast.map((member) => (
                <li key={member.id} className="mb-2">
                  <Link
                    to={`/person/${member.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {member.name}
                  </Link>{" "}
                  as {member.character}
                </li>
              ))}
            </ul>
          </div>

          {/* Back to Movie Details */}
          <Link
            to={`/movie/${id}`}
            className="mt-4 bg-red-500 hover:bg-red-600 p-2 rounded-md block text-center"
          >
            Back to Movie Details
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FullCastAndCrew;
