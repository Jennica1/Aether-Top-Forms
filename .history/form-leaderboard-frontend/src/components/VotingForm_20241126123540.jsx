import React, { useState } from "react";
import axios from "axios";

const VotingForm = () => {
  const [formType, setFormType] = useState("");

  const handleVote = async (e) => {
    e.preventDefault();

    if (!formType) {
      alert("Please select a form!");
      return;
    }

    try {
      // await axios.post("https://aether-top-forms-leaderboard.onrender.com/api/votes", { formType });
      
      await axios.post("http://localhost:5000/api/votes", { formType });

      alert("Vote submitted!");
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
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
  );
};

export default VotingForm;
