import React, { useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const fetchLeaderboard = async () => {
    try {
      // Fetch leaderboard and descriptions
      const [leaderboardData, descriptionsData] = await Promise.all([
        axios.get("https://aether-top-forms-leaderboard.onrender.com/api/votes/leaderboard"),
        
      ]);
      setLeaderboard(leaderboardData.data);
      setShowLeaderboard(true); // Display leaderboard after fetching
    } catch (error) {
      console.error("Error fetching leaderboard or descriptions:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchLeaderboard}>View Leaderboard</button>

      {showLeaderboard && (
        <ul>
          {leaderboard.map((entry) => (
            <li key={entry._id}>
              <strong>{entry._id}</strong>: {entry.count} votes
              <p>{formDescriptions[entry._id] || "No description available."}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
