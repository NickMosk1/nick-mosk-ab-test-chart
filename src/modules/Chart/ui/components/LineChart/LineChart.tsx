import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./LineChart.module.css";
import { Variation, LineStyle } from "@/shared/types";
import { Tooltip as CustomTooltip, Legend as CustomLegend } from "./components";

interface LineChartProps {
  data: any[];
  variations: Variation[];
  conversionRateRange: { min: number; max: number };
  lineStyle: LineStyle;
};

const LineChart: React.FC<LineChartProps> = ({
  data,
  variations,
  conversionRateRange,
  lineStyle,
}) => {
  return (
    <div className={styles.lineChart}>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >          
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#e1e5e9" }}
            tickLine={false}
          />
          <YAxis
            domain={[conversionRateRange.min * 0.9, conversionRateRange.max * 1.1]}
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#e1e5e9" }}
            tickLine={false}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          {variations.map((variation) => (
            <Line
              key={variation.id}
              type={lineStyle}
              dataKey={`variation_${variation.id}`}
              name={variation.name}
              stroke={variation.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
              isAnimationActive={true}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
