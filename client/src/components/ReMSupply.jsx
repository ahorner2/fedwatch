import React, { useMemo } from "react";
import { useTheme } from "@mui/material";
import { useGetMSupplyQuery } from "state/api";
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
import moment from "moment";
import ReCustomTooltip from "./ReCustomTooltip";

const getRequiredDateFormat = (timeStamp, format = "M/DD/YYYY") => {
  return moment(timeStamp).format(format);
};

const ReOverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetMSupplyQuery();

  const getDataKey = (view) => {
    if (view === "M1") {
      return "y"; // Use the appropriate data key for M1 view
    } else if (view === "M2") {
      return "y"; // Use the appropriate data key for M2 view
    } else if (view === "M3") {
      return "y"; // Use the appropriate data key for M3 view
    } else {
      return null; // Return null or a default data key for other views
    }
  };

  // useMemo only calcs data once
  const [m1Line, m2Line, m3Line] = useMemo(() => {
    if (!data || data.length === 0) return [[], [], []];

    const m1Line = {
      id: "M1",
      label: "M1 Supply",
      // color: theme.palette.secondary.main,
      data: [],
    };

    const m2Line = {
      id: "M2",
      label: "M2 Supply",
      // color: theme.palette.secondary.secondary[600],
      data: [],
    };

    const m3Line = {
      id: "M3",
      label: "M3 Supply",
      // color: theme.palette.secondary.secondary[600],
      data: [],
    };

    const arr = data;
    arr.forEach(({ date, M1, M2, M3 }) => {
      const curM1 = parseFloat(M1);
      const curM2 = parseFloat(M2);
      const curM3 = parseFloat(M3);

      const formattedDate = getRequiredDateFormat(date);
      // const formattedDate = new Date(date).toLocaleDateString();

      m1Line.data.push({ x: formattedDate, y: curM1 });
      m2Line.data.push({ x: formattedDate, y: curM2 });
      m3Line.data.push({ x: formattedDate, y: curM3 });

      m1Line.data.sort((a, b) => new Date(a.x) - new Date(b.x));
      m2Line.data.sort((a, b) => new Date(a.x) - new Date(b.x));
      m3Line.data.sort((a, b) => new Date(a.x) - new Date(b.x));

    });

    return [m1Line.data, m2Line.data, m3Line.data];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data || isLoading) return "Loading...";

  const formatXAxis = (tickItem) => {
    return moment(tickItem).format("MMM DD YYYY");
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

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveContainer>
      <AreaChart
        width={"100%"}
        syncId={view === "M1" ? "M1" : view === "M2" ? "M2" : "M3"}
        data={
          view === "M1"
            ? m1Line
            : view === "M2"
            ? m2Line
            : view === "M3"
            ? m3Line
            : []
        }
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}>
        <defs>
          <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="30%" stopColor="#f9d8af" stopOpacity={0.8} />
            <stop offset="60%" stopColor="#fce4c5" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#4d547d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray={"3 3"} stroke="false" />
        <XAxis dataKey="x" tickFormatter={formatXAxis} />
        <YAxis
          type="number"
          dataKey="y"
          domain={["dataMin", "dataMax"]}
          tickFormatter={formatYAxis}
        />
        <Tooltip content={<ReCustomTooltip />} />
        <Area
          type="monotone"
          dataKey={getDataKey(view)}
          stroke={theme.palette.secondary[300]}
          strokeWidth="2px"
          fill="url(#colorNet)"
          fillOpacity={0.2}
          points={[]}
        />
        <Brush dataKey="x" tickFormatter={formatXAxis} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ReOverviewChart;
