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
import { Variation, LineType } from "@/shared/types";
import { Tooltip as CustomTooltip, Legend as CustomLegend } from "./components";

interface LineChartProps {
  data: any[];
  variations: Variation[];
  conversionRateRange: { min: number; max: number };
  lineType: LineType;
};

const LineChart: React.FC<LineChartProps> = ({
  data,
  variations,
  conversionRateRange,
  lineType,
}) => {
  return (
    <div className={styles.lineChart}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
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
              type={lineType}
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
