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
import { Variation } from "@/shared/types";

interface LineChartProps {
  data: any[];
  variations: Variation[];
  conversionRateRange: { min: number; max: number };
};

const LineChart: React.FC<LineChartProps> = ({
  data,
  variations,
  conversionRateRange,
}) => {
  const renderTooltip = (props: any) => {
    const { active, payload, label } = props;

    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <div className={styles.tooltipDate}>{label}</div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className={styles.tooltipItem}>
              <span
                className={styles.tooltipColor}
                style={{ backgroundColor: entry.color }}
              />
              <span className={styles.tooltipName}>{entry.name}:</span>
              <span className={styles.tooltipValue}>
                {typeof entry.value === "number" ? entry.value.toFixed(2) + "%" : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className={styles.legend}>
        {payload.map((entry: any, index: number) => (
          <div key={index} className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ backgroundColor: entry.color }}
            />
            <span className={styles.legendText}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

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
          <Tooltip content={renderTooltip} />
          <Legend content={renderLegend} />
          {variations.map((variation) => (
            <Line
              key={variation.id}
              type="monotone"
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
