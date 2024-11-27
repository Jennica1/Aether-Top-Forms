import React, { useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  // const [leaderboard, setLeaderboard] = useState([]);

  // const fetchLeaderboard = async () => {
  //   try {
  //     const { data } = await axios.get("https://aether-top-forms-leaderboard.onrender.com/api/votes/leaderboard");

  //     setLeaderboard(data);
  //   } catch (error) {
  //     console.error("Error fetching leaderboard:", error);
  //   }
  // };

  return (
    <div>
      {/* <button onClick={fetchLeaderboard}>View Leaderboard</button> */}
      <ul>
        {/* {leaderboard.map((entry) => (
          <li key={entry._id}>
            {entry._id}: {entry.count} votes
          </li>
        ))} */}
        <h3 name="Form name">

        </h3>

      </ul>
    </div>
  );
};

export default Leaderboard;
