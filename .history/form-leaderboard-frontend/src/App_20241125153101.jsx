import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const response = await axios.get("/api/leaderboard"); // Frontend proxy will handle the rest


function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedForms, setSelectedForms] = useState([]);


  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("http://localhost:5000/leaderboard");
      setLeaderboard(response.data.sort((a, b) => b.count - a.count));
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  // Handle form selection
  const handleSelection = (e) => {
    const value = e.target.value;
    setSelectedForms((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((form) => form !== value)
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        selectedForms.map((formName) =>
          axios.post("http://localhost:5000/vote", { formName })
        )
      );
      setSelectedForms([]);
      fetchLeaderboard(); // Refresh leaderboard
    } catch (err) {
      console.error("Failed to submit votes:", err);
    }
  };

  // Fetch leaderboard on mount
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <>
      <div>
        <h1>Aether Forms</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="checkbox"
            id="form1"
            value="Disability Form"
            checked={selectedForms.includes("Disability Form")}
            onChange={handleSelection}
          />
          <label htmlFor="form1">Disability Form</label>
          <br />
          <input
            type="checkbox"
            id="form2"
            value="Financial Form"
            checked={selectedForms.includes("Financial Form")}
            onChange={handleSelection}
          />
          <label htmlFor="form2">Financial Form</label>
          <br />
          <input
            type="checkbox"
            id="form3"
            value="Death Form"
            checked={selectedForms.includes("Death Form")}
            onChange={handleSelection}
          />
          <label htmlFor="form3">Death Form</label>
          <br />
          <button type="submit">Submit</button>
        </form>

        <h2>Leaderboard</h2>
        <ol>
          {leaderboard.map(({ formName, count }) => (
            <li key={formName}>
              {formName}: {count} votes
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
