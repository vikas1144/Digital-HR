import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4caf50", "#ffc107", "#f44336"]; // green, amber, red

const SentimentChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const querySnapshot = await getDocs(collection(db, "feedback"));
      const sentiments = { Positive: 0, Neutral: 0, Negative: 0 };

      querySnapshot.forEach((doc) => {
        const feedback = doc.data();
        const sentiment = feedback.sentiment || "Neutral";
        if (sentiments[sentiment] !== undefined) {
          sentiments[sentiment]++;
        }
      });

      const chartData = Object.entries(sentiments).map(([key, value]) => ({
        name: key,
        value,
      }));

      setData(chartData);
    };

    fetchFeedbacks();
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 className="text-white text-xl mb-2">Employee Feedback Sentiment</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;
