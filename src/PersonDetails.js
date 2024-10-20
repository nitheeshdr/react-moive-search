import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function PersonDetails() {
  const { id } = useParams(); // Person ID from URL
  const [person, setPerson] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "8a138c7071b8253c505a486b9af1d1f3";

  useEffect(() => {
    // Fetch person details
    const fetchPersonDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`
        );
        setPerson(response.data);
      } catch (err) {
        setError("Something went wrong while fetching person details.");
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
      {person ? (
        <>
          <img
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                : "https://via.placeholder.com/300"
            }
            alt={person.name}
            className="w-full h-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{person.name}</h2>
          <p><strong>Known For:</strong> {person.known_for_department}</p>
          <p><strong>Birthday:</strong> {person.birthday}</p>
          <p><strong>Biography:</strong> {person.biography || "Biography not available."}</p>
          <Link to="/" className="mt-4 bg-red-500 hover:bg-red-600 p-2 rounded-md">
            Back to Search Results
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PersonDetails;
