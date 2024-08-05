import React from "react";
import { useContext } from "react";
import DataContext from "../context/context";

function DailyReward() {
  const { blum, daily_reward_claimer } = useContext(DataContext);
  const elapsedDate = new Date() - new Date(blum.date);
  const day = elapsedDate / 1000 / 60 / 60;
  return (
    <div className={day >= 24 ? "DailyReward active" : "DailyReward"}>
      <img src="/thunder.gif" alt="" />
      <h3 className="daily_title">Your daily rewards</h3>
      <div className="daily_card">
        <img src="/ssNSbVRV_400x400.jpg" alt="" />
        <h6 className="daily_card_title">20</h6>
        <h5 className="daily_card_sub_title">Blum Points</h5>
      </div>
      <p className="daily_text">Come back tomorrow for get gift again.</p>
      <p className="daily_text_2">Tip: Skipping a day resets your check-in.</p>
      <button onClick={daily_reward_claimer} className="daily_button">
        Continue
      </button>
    </div>
  );
}

export default DailyReward;
