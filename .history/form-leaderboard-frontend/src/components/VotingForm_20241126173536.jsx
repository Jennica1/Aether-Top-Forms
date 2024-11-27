import React, { useState } from "react";
import axios from "axios";
import formDescriptions from "./formDescriptions.json"; // Import the JSON file

const VotingForm = () => {
  const [formType, setFormType] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

  const handleVote = async (e) => {
    e.preventDefault();

    if (!formType) {
      alert("Please select a form!");
      return;
    }

    try {
      await axios.post("https://aether-top-forms-leaderboard.onrender.com/api/votes", { formType });
      alert("Vote submitted!");
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const handleFormSelection = (form) => {
    setFormType(form);
    const description = formDescriptions.find((item) => item.formType === form)?.description;
    setSelectedDescription(description || "No description available.");
  };

  return (
    <div>
      <form onSubmit={handleVote}>
        {formDescriptions.map((form) => (
          <div key={form.formType}>
            <label>
              <input
                type="radio"
                name="form"
                value={form.formType}
                onChange={(e) => handleFormSelection(e.target.value)}
              />
              {form.formType}
            </label>
            <br />
          </div>
        ))}
        <button type="submit">Submit Vote</button>
      </form>

      <hr />

      {selectedDescription && (
        <div>
          <h3>Form Description</h3>
          <p>{selectedDescription}</p>
        </div>
      )}
    </div>
  );
};

export default VotingForm;
