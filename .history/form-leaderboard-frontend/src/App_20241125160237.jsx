import React, { useState } from "react";
import axios from "axios";  // Import axios here

function App() {
  const [formType, setFormType] = useState("");  // Track selected form type
  const [leaderboard, setLeaderboard] = useState([]);  // Track leaderboard data

  // Function to handle vote submission
  const handleVote = async (e) => {
    e.preventDefault();  // Prevent page reload on form submission

    if (!formType) {
      alert("Please select a form!");
      return;
    }

    try {
      // Make a POST request to save the user's vote
      await axios.post("http://localhost:5000/api/votes", { formType });
      alert("Vote submitted!");  // Notify user that the vote was submitted
    } catch (error) {
      console.error("Error submitting vote:", error);  // Log error if request fails
    }
  };

  // Function to fetch leaderboard data
  const fetchLeaderboard = async () => {
    try {
      // Make a GET request to fetch the leaderboard
      const { data } = await axios.get("http://localhost:5000/api/votes/leaderboard");
      setLeaderboard(data);  // Update leaderboard state with fetched data
    } catch (error) {
      console.error("Error fetching leaderboard:", error);  // Log error if request fails
    }
  };

  return (
    <div>
      <h1>Aether Forms</h1>
      <form onSubmit={handleVote}>
        <label>
          <input
            type="radio"
            name="form"
            value="Disability Form"
            onChange={(e) => setFormType(e.target.value)}  // Update formType when selected
          />
          Disability Form
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="form"
            value="Financial Form"
            onChange={(e) => setFormType(e.target.value)}  // Update formType when selected
          />
          Financial Form
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="form"
            value="Death Form"
            onChange={(e) => setFormType(e.target.value)}  // Update formType when selected
          />
          Death Form
        </label>
        <br />
        <button type="submit">Submit Vote</button>
      </form>

      <hr />
      <button onClick={fetchLeaderboard}>View Leaderboard</button>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry._id}>
            {entry._id}: {entry.count} votes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
