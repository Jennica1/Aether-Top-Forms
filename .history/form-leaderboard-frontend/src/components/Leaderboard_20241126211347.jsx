import React, { useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  const fetchLeaderboardAndDescriptions = async () => {
    try {
      // Fetch leaderboard data from the backend
      const { data: leaderboardData } = await axios.get(
        "https://aether-top-forms-leaderboard.onrender.com/api/votes/leaderboard"
      );

      // Fetch form descriptions from the JSON file
      const descriptionsModule = await import("../formDescriptions.json");
      const formDescriptions = descriptionsModule.default;

      // Combine leaderboard data with form descriptions
      const combinedData = leaderboardData.map((entry) => {
        const description = formDescriptions.find(
          (form) => form.formType === entry._id
        )?.description;
        return { ...entry, description: description || "No description available." };
      });

      setLeaderboard(combinedData);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching leaderboard or descriptions:", error);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      <button onClick={fetchLeaderboardAndDescriptions}>View Leaderboard</button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Display the leaderboard with descriptions */}
      <h3>Leaderboard:</h3>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry._id}>
            <strong>{entry._id}</strong> ({entry.count} votes): {entry.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
