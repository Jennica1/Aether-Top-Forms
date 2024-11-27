import React, { useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [formDescriptions, setFormDescriptions] = useState([]);
  const [error, setError] = useState(null);

  const fetchLeaderboardAndDescriptions = async () => {
    try {
      // Fetch leaderboard data from the backend
      const { data: leaderboardData } = await axios.get(
        "https://aether-top-forms-leaderboard.onrender.com/api/votes/leaderboard"
      );

      // Fetch form descriptions from the JSON file
      const descriptionsModule = await import("../formDescriptions.json");

      setLeaderboard(leaderboardData);
      setFormDescriptions(descriptionsModule.default);
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

      {/* Display the leaderboard */}
      <h3>Leaderboard:</h3>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry._id}>
            <strong>{entry._id}</strong> ({entry.count} votes): {entry.description}
          </li>
        ))}
      </ul>

      {/* Display the form descriptions */}
      <h3>Form Descriptions:</h3>
      <ul>
        {formDescriptions.map((form) => (
          <li key={form.formType}>
            {form.formType}: {form.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
