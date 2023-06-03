import React, { useMemo } from "react";
import { useTheme } from "@mui/material";
import { useGetMSupplyQuery } from "state/api";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import CustomTooltip from "./CustomTooltip";

const getRequiredDateFormat = (timeStamp, format = "MM-DD-YYYY") => {
  return moment(timeStamp).format(format);
};

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetMSupplyQuery();

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
      data: []
    };

    const arr = data;
    arr.forEach(
      ({ date, M1, M2, M3 }) => {
        const curM1 = parseFloat(M1); 
        const curM2 = parseFloat(M2); 
        const curM3 = parseFloat(M3);

        const formattedDate = getRequiredDateFormat(date, "M/DD/YYYY")
        // const formattedDate = new Date(date).toLocaleDateString();

        m1Line.data.push({ x: formattedDate, y: curM1 });
        m2Line.data.push({ x: formattedDate, y: curM2 });
        m3Line.data.push({ x: formattedDate, y: curM3 });

        m1Line.data.sort((a, b) => new Date(a.x) - new Date(b.x));
        m2Line.data.sort((a, b) => new Date(a.x) - new Date(b.x));
        m3Line.data.sort((a, b) => new Date(a.x) - new Date(b.x));
        
        // m1Line.data = [
        //   ...m1Line.data,
        //   { x: formattedDate, y: curM1 }
        // ];
        // m2Line.data = [
        //   ...m2Line.data,
        //   { x: formattedDate, y: curM2 }
        // ];
        // m3Line.data = [
        //   ...m3Line.data,
        //   { x: formattedDate, y: curM3 }
        // ];

        // return {M1: curM1, M2: curM2, M3: curM3 };
      },
    );
    
    return [[m1Line], [m2Line], [m3Line]];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveLine
      data={
        view === "M1"
          ? m1Line
          : view === "M2"
          ? m2Line
          : view === "M3"
          ? m3Line
          : []
      }
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
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
        crosshair: {
          line: {
            stroke: theme.palette.secondary[200],
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{
        type: "time",
        format: "%m/%d/%Y",
        // format: "%Y-%m-%dT%H:%M:%S.%LZ",
        // precision: "month",
        // useUTC: false,
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-,.4s"
      xFormat="time:%m/%d/%Y"
      curve="catmullRom"
      enableArea={true}
      areaOpacity={0.2}
      areaBaselineValue={
        view === "M1"
          ? 1122100000000
          : view === "M2"
          ? 4666200000000
          : view === "M3"
          ? 4666200000000
          : 0
      }
      axisTop={null}
      axisRight={null}
      axisBottom={{
        // // convert date objects to str
        // format: (values) => {
        //   const mth = values.toString().slice(0, 2);
        //   if (data.includes(mth)) {
        //     data = data.filter((item) => item !== mth);
        //     return `${getRequiredDateFormat(values, "MMMM-DD")}`;
        //   } else return "";
        // },
        format:"%Y",
        tickValues: "every year",
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        format: "<-.2s",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${
              view === "M1" ? "M1" : view === "M2" ? "M2" : "M3"
            } for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={0}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      crosshairType="x"
      enableSlices={false} // crosshair "free" movement
      tooltip={CustomTooltip}
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
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
