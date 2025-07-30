import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./MoodTracker.css";

const moodScale = {
  Happy: 5,
  Calm: 4,
  Neutral: 3,
  Tired: 2,
  Sad: 1,
  Anxious: 0,
};

const MoodChart = ({ history }) => {
  const chartData = history.map((entry) => {
    const moodLabel =
      typeof entry.mood === "string" ? entry.mood : entry.mood.label;

    return {
      date: entry.date.split(",")[0],
      moodValue: moodScale[moodLabel] ?? 3,
    };
  });

  const valueToMood = (value) =>
    Object.keys(moodScale).find((key) => moodScale[key] === value) || value;

  return (
    <div className="mood-chart">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            tickFormatter={valueToMood}
          />
          <Tooltip formatter={(value) => valueToMood(value)} />
          <Line
            type="monotone"
            dataKey="moodValue"
            stroke="#c44d58"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;