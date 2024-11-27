import React, { useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      const { data } = await axios.get("https://aether-top-forms-leaderboard.onrender.com//api/votes/leaderboard");
      setLeaderboard(data);
      setError(null); // Clear previous errors
    } catch (error) {
      console.error("Error fetching leaderboard or descriptions:", error);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      <button onClick={fetchLeaderboard}>View Leaderboard</button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry._id}>
            {entry._id}: {entry.count} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
