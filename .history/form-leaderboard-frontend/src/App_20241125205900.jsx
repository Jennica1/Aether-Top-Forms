import React from "react";
import VotingForm from "./components/VotingForm";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <div>
      <h1>Aether Forms</h1>
      <VotingForm />
      <hr />
      <Leaderboard />
    </div>
  );
}

export default App;
