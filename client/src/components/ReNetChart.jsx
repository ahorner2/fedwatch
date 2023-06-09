import {
  // LineChart,
  // Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  Brush,
  AreaChart,
  Area,
  // Label,
  ResponsiveContainer,
} from "recharts";
import { useGetNetQuery } from "state/api";
import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import moment from "moment";
import ReCustomTooltip from "./ReCustomTooltip";

const ReNetChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetNetQuery();

  // eslint-disable-next-line
  const dataNetLiquidity = useMemo(() => {
    // eslint-disable-next-line
    if (!data || isLoading) return [];

    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const netLine = {
      id: "net_liquidity",
      label: "Net Liquidity",
      data: sortedData.map((row) => ({
        x: row.date,
        y: parseFloat(row.net_liquidity),
      })),
    };
    const result = [netLine];
    return result;
    // eslint-disable-next-line
  }, [data]);

  const formatXAxis = (tickItem) => {
    return moment(tickItem).format("MMM Do YY")
  };

  const formatYAxis = (tickItem) => {
    const trillion = 1000000000000;
    const trillionSymbol = "T";

    if (tickItem >= trillion) {
      const formattedNumber = (tickItem / trillion).toFixed(2);
      return formattedNumber + trillionSymbol;

    }
    return tickItem.toLocaleString("en-US");
  };

  return (
    <ResponsiveContainer>
      <AreaChart
        height={600}
        width="100%"
        data={data}
        syncId="date"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}>
        <defs>
          <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="30%" stopColor="#f9d8af" stopOpacity={0.8} />
            <stop offset="60%" stopColor="#fce4c5" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#4d547d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="false" />
        <XAxis dataKey="date" tickFormatter={formatXAxis} />
        <YAxis
          type="number"
          domain={["dataMin", "dataMax"]}
          tickFormatter={formatYAxis}></YAxis>
        <Tooltip content={<ReCustomTooltip />} />
        <Area
          type="monotone"
          dataKey="net_liquidity"
          stroke={theme.palette.secondary[300]}
          strokeWidth="2px"
          fill="url(#colorNet)"
          fillOpacity={0.2}
          points={[]}
        />
        <Brush dataKey="date" tickFormatter={formatXAxis} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ReNetChart;