import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [formDescriptions, setFormDescriptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch leaderboard and descriptions
        const [leaderboardData, descriptionsData] = await Promise.all([
          axios.get("https://aether-top-forms-leaderboard.onrender.com/api/votes/leaderboard"),
          axios.get("https://aether-top-forms-leaderboard.onrender.com/api/votes/form-details"),
        ]);
        setLeaderboard(leaderboardData.data);
        setFormDescriptions(descriptionsData.data);
      } catch (error) {
        console.error("Error fetching leaderboard or descriptions:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry._id}>
            <strong>{entry._id}</strong>: {entry.count} votes
            <p>{formDescriptions[entry._id] || "No description available."}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
