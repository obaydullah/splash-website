"use client";

import { getLeaderboard } from "@/actions/get-leaderboard";
import { useEffect, useState } from "react";
import "../../styles/leaderboard.css";
import { LeaderboardRemainingTime } from "./LeaderboardRemainingTime";

// Define formatter for currency formatting
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Leaderboard = ({ selectedLeaderboard }) => {
  const [data, setData] = useState(null);
  const defaultPrizes = {
    4: "$25",
    5: "$15",
    6: "$10",
    7: "$10",
    8: "$5",
    9: "$5",
    10: "$5",
  };

  const fetchLeaderboard = async () => {
    const leaderboardData = await getLeaderboard(
      selectedLeaderboard,
      new Date().getUTCMonth() + 1,
      new Date().getUTCFullYear()
    );
    setData(leaderboardData);
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(interval);
  }, [selectedLeaderboard]);

  return (
    <>
      <div className="leaderboard__card--area">
        <div className="container">
          <div className="leaderboard__cards">
            {data && data.leaderboard.length > 1 && (
              <div className="leaderboard__card">
                <img src="/images/leaderboard-card-1.png" alt="" />
                <div className="leaderboard__card--content">
                  <p className="user">User</p>
                  <h3 className="name">{data.leaderboard[1].username}</h3>
                  <p className="wagered">Wagered</p>
                  <p className="amount">
                    {/* <span>$</span> */}
                    {formatter.format(data.leaderboard[1].wagerAmount)}
                  </p>
                  <p className="reward">Reward</p>
                  <a href="#" className="leaderboard__card--btn">
                    $75
                  </a>
                </div>
              </div>
            )}
            {data && data.leaderboard.length > 0 && (
              <div className="leaderboard__card middle">
                <img src="/images/leaderboard-card-2.png" alt="" />
                <div className="leaderboard__card--content">
                  <p className="user">User</p>
                  <h3 className="name">{data.leaderboard[0].username}</h3>
                  <p className="wagered">Wagered</p>
                  <p className="amount">
                    {/* <span>$</span> */}
                    {formatter.format(data.leaderboard[0].wagerAmount)}
                  </p>
                  <p className="reward">Reward</p>
                  <a href="#" className="leaderboard__card--btn">
                    $150
                  </a>
                </div>
              </div>
            )}
            {data && data.leaderboard.length > 2 && (
              <div className="leaderboard__card">
                <img src="/images/leaderboard-card-3.png" alt="" />
                <div className="leaderboard__card--content">
                  <p className="user">User</p>
                  <h3 className="name">{data.leaderboard[2].username}</h3>
                  <p className="wagered">Wagered</p>
                  <p className="amount">
                    {/* <span>$</span> */}
                    {formatter.format(data.leaderboard[2].wagerAmount)}
                  </p>
                  <p className="reward">Reward</p>
                  <a href="#" className="leaderboard__card--btn">
                    $50
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="leaderboard__area">
        <div className="container">
          <div className="leaderboard__inner">
            <LeaderboardRemainingTime
              selectedLeaderboard={selectedLeaderboard}
            />

            <div className="challengers">
              <h3 className="challengers__title">Challengers</h3>

              <div className="challengers__header">
                <p>place</p>
                <p>username</p>
                <p>Wagered</p>
                <p>Prize</p>
              </div>
              <div className="challengers__table">
                {data?.leaderboard?.slice(3, 10).map((challenger, index) => (
                  <div className="challengers__item" key={index}>
                    <p className="sl">{index + 4}</p>
                    <p className="name">{challenger?.username}</p>
                    <p className="challengers__num">
                      {/* <span>$</span> */}
                      {formatter.format(challenger?.wagerAmount)}
                    </p>
                    <p className="challengers__prize">
                      {defaultPrizes[index + 4]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
