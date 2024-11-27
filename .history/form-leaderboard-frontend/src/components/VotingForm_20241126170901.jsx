import React, { useState, useEffect } from "react";
import axios from "axios";

const VotingForm = () => {
  const [formType, setFormType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const { data } = await axios.get(
          "https://aether-top-forms-leaderboard.onrender.com/api/votes/form-details"
        );
        if (formType && data[formType]) {
          setDescription(data[formType]);
        } else {
          setDescription(""); // Clear description if no form selected
        }
      } catch (error) {
        console.error("Error fetching form descriptions:", error);
      }
    };
    fetchDescriptions();
  }, [formType]);

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

  return (
    <div>
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

      {formType && (
        <div>
          <h3>{formType}</h3>
          <p>{description || "Loading description..."}</p>
        </div>
      )}
    </div>
  );
};

export default VotingForm;
