import { useState } from "react";
import "./App.css";

function App() {
  // State to track form selections
  const [votes, setVotes] = useState({
    "Disability Form": 0,
    "Financial Form": 0,
    "Death Form": 0,
  });
  const [selectedForms, setSelectedForms] = useState([]);

  // Handle form selection
  const handleSelection = (e) => {
    const value = e.target.value;
    setSelectedForms((prev) =>
      e.target.checked
        ? [...prev, value] // Add selected value
        : prev.filter((form) => form !== value) // Remove unselected value
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVotes = { ...votes };
    selectedForms.forEach((form) => {
      updatedVotes[form] += 1;
    });
    setVotes(updatedVotes);
    setSelectedForms([]); // Reset selections
  };

  // Create a sorted leaderboard
  const leaderboard = Object.entries(votes).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <div>
        <h1>Aether Forms</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="checkbox"
            id="form1"
            name="form1"
            value="Disability Form"
            checked={selectedForms.includes("Disability Form")}
            onChange={handleSelection}
          />
          <label htmlFor="form1">Disability Form</label>
          <br />
          <input
            type="checkbox"
            id="form2"
            name="form2"
            value="Financial Form"
            checked={selectedForms.includes("Financial Form")}
            onChange={handleSelection}
          />
          <label htmlFor="form2">Financial Form</label>
          <br />
          <input
            type="checkbox"
            id="form3"
            name="form3"
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
          {leaderboard.map(([form, count]) => (
            <li key={form}>
              {form}: {count} votes
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
