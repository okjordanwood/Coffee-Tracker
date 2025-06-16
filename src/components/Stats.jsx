import { useAuth } from "../context/AuthContext";
import {
  calculateCoffeeStats,
  calculateCurrentCaffeineLevel,
  getTopThreeCoffees,
  statusLevels,
} from "../utils";

function StatCard(props) {
  const { lg, title, children } = props;

  return (
    <div className={"card stat-card " + (lg ? " col-span-2" : " ")}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

export default function Stats() {
  const { globalData } = useAuth();

  const dailyStats = calculateCoffeeStats(globalData, "daily");
  const weeklyStats = calculateCoffeeStats(globalData, "weekly");
  const allTimeStats = calculateCoffeeStats(globalData, "all");
  const caffeineLevel = calculateCurrentCaffeineLevel(globalData);

  const warningLevel =
    caffeineLevel < statusLevels["low"].maxLevel
      ? "low"
      : caffeineLevel < statusLevels["moderate"].maxLevel
      ? "moderate"
      : "high";

  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-chart-simple" />
        <h2>Stats</h2>
      </div>
      <div className="stats-grid">
        <StatCard lg title="Active Caffeine Level">
          <div className="status">
            <p>
              <span className="stat-text">{caffeineLevel}</span>mg
            </p>
            <h5
              style={{
                color: statusLevels[warningLevel].color,
                background: statusLevels[warningLevel].background,
              }}
            >
              {warningLevel}
            </h5>
          </div>
          <p>{statusLevels[warningLevel].description}</p>
        </StatCard>
        <StatCard title="Daily Caffeine">
          <p>
            <span className="stat-text">{dailyStats.daily_caffeine}</span>mg
          </p>
          <p>Today: {dailyStats.total_caffeine}mg</p>
        </StatCard>
        <StatCard title="Weekly Caffeine">
          <p>
            <span className="stat-text">{weeklyStats.daily_caffeine}</span>
            mg/day
          </p>
          <p>Total: {weeklyStats.total_caffeine}mg</p>
        </StatCard>
        <StatCard title="Avg # of Coffees">
          <p>
            <span className="stat-text">{dailyStats.average_coffees}</span>/day
          </p>
          <p>Today: {dailyStats.total_coffees}</p>
        </StatCard>
        <StatCard title="Daily Cost ($)">
          <p>
            <span className="stat-text">${dailyStats.daily_cost}</span>
          </p>
          <p>Today: ${dailyStats.total_cost}</p>
        </StatCard>
        <StatCard title="Weekly Cost ($)">
          <p>
            <span className="stat-text">${weeklyStats.daily_cost}</span>/day
          </p>
          <p>Total: ${weeklyStats.total_cost}</p>
        </StatCard>
        <StatCard title="All Time Cost ($)">
          <p>
            <span className="stat-text">${allTimeStats.total_cost}</span>
          </p>
        </StatCard>
        <table className="stat-table">
          <thead>
            <tr>
              <th>Coffee Name</th>
              <th>Number of Purchases</th>
              <th>Percentage of Total</th>
              <th>Last 5 Purchases</th>
            </tr>
          </thead>
          <tbody>
            {getTopThreeCoffees(globalData).map((coffee, coffeeIndex) => {
              return (
                <tr key={coffeeIndex}>
                  <td>{coffee.coffeeName}</td>
                  <td>{coffee.count}</td>
                  <td>{coffee.percentage}</td>
                  <td>
                    <div className="coffee-dates">
                      {coffee.dates.map((date, dateIndex) => (
                        <div key={dateIndex} className="coffee-date">
                          {date}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
