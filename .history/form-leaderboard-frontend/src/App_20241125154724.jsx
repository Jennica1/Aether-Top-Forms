import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formType, setFormType] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const handleVote = async (e) => {
    e.preventDefault();

    if (!formType) {
      alert("Please select a form!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/votes", { formType });
      alert("Vote submitted!");
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/votes/leaderboard");
      setLeaderboard(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
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
            onChange={(e) => setFormType(e.target.value)}
          />
          Disability Form
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="form"
            value="Financial Form"
            onChange={(e) => setFormType(e.target.value)}
          />
          Financial Form
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="form"
            value="Death Form"
            onChange={(e) => setFormType(e.target.value)}
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
