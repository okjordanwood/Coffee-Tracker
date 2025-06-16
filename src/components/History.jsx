import {
  calculateCurrentCaffeineLevel,
  getCaffeineAmount,
  timeSinceConsumption,
  filterHistoryByTimePeriod,
} from "../utils";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function History() {
  const { globalData } = useAuth();
  const [showAll, setShowAll] = useState(false);

  // Get recent history (last 7 days) or all history
  const historyToShow = showAll
    ? globalData
    : filterHistoryByTimePeriod(globalData, "weekly");

  // Group entries by date
  const groupedHistory = Object.entries(historyToShow)
    .sort((a, b) => b[0] - a[0])
    .reduce((acc, [utcTime, coffee]) => {
      const date = new Date(parseInt(utcTime)).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        utcTime,
        coffee,
        timeSince: timeSinceConsumption(utcTime),
        originalAmount: getCaffeineAmount(coffee.name),
        remainingAmount: calculateCurrentCaffeineLevel({ [utcTime]: coffee }),
      });
      return acc;
    }, {});

  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-timeline" />
        <h2>History</h2>
      </div>
      <p>
        <i>
          Showing {showAll ? "all" : "last 7 days"} of coffee history. Click a
          coffee icon for details.
        </i>
      </p>
      <div className="coffee-history">
        {Object.entries(groupedHistory)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([date, coffees]) => (
            <div key={date} className="history-date-group">
              <h4>{date}</h4>
              <div className="history-coffees">
                {coffees.map((coffeeData, index) => (
                  <div
                    key={index}
                    className="coffee-entry"
                    title={`
                      ${coffeeData.coffee.name}
                      Time: ${new Date(
                        parseInt(coffeeData.utcTime)
                      ).toLocaleTimeString()}
                      Cost: $${coffeeData.coffee.cost}
                      Original Caffeine: ${coffeeData.originalAmount}mg
                      Remaining Caffeine: ${coffeeData.remainingAmount}mg
                      Time Since: ${coffeeData.timeSince}
                    `}
                  >
                    <i className="fa-solid fa-mug-hot" />
                    <span className="coffee-time">{coffeeData.timeSince}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <div className="history-toggle-buttons">
        {!showAll ? (
          <button
            className="history-show-more"
            onClick={() => setShowAll(true)}
          >
            Show All History
          </button>
        ) : (
          <button
            className="history-show-recent"
            onClick={() => setShowAll(false)}
          >
            Show Recent History
          </button>
        )}
      </div>
    </>
  );
}
