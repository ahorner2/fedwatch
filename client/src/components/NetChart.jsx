import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetNetQuery } from "state/api";
import CustomTooltip from "./CustomTooltip";

const NetChart = ({ isDashboard = false }) => {
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

  return (
    <ResponsiveLine
      data={dataNetLiquidity}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        crosshair: {
          line: {
            stroke: theme.palette.secondary[200],
          },
        },
        tooltip: {
          basic: {
            whiteSpace: "nowrap",
            display: "flex",
            position: "absolute",
          },
          container: {
            color: theme.palette.primary.main,
            zIndex: 9999,
            position: "absolute",
          },
          table: {
            // position: "absolute",
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%dT%H:%M:%S.%LZ",
        precision: "day",
      }}
      yScale={{
        type: "linear",
        min: "5400000000000",
        max: "6400000000000",
        stacked: true,
        reverse: false,
      }}
      yFormat="$,.2f"
      enableArea={true}
      areaOpacity={0.2}
      areaBaselineValue="5400000000000"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: "%b-%d-%y",
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: "every month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: -60,
        legendPosition: "middle",
        format: ">-.2s",
      }}
      xFormat={"time:%b-%d-%y"}
      enableGridX={false}
      enableGridY={false}
      pointSize={!isDashboard ? 7 : 0}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      crosshairType="x"
      enableSlices={false} // crosshair "free" movement
      transportation
      defs={[
        {
          id: "gradientC",
          type: "linearGradient",
          colors: [
            { offset: 0, color: "#f9d8af" },
            { offset: 90, color: "#f9d8af", opacity: 0 },
          ],
        },
      ]}
      fill={[{ match: "*", id: "gradientC" }]}
      tooltip={CustomTooltip}
    />
  );
};

export default NetChart;
