import React, { useMemo, useState } from "react";
import { useGetListQuery } from "state/api";
import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";

const props = {
  enableSlices: "x",
};

const Breakdown = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetListQuery();
  // const [hiddenIds, setHiddenIds] = useState([]);
  
  const dataAndViews = useMemo(() => {
    if (!data || isLoading) return [];

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const lastWeekData = sortedData.slice(-7);    

    const fedLine = {
      id: "net_change_fed",
      label: "Net Change Fed",
      data: lastWeekData.map((row) => ({
        x: row.date,
        y: parseFloat(row.net_change_fed),
      })),
    };
    const tgaLine = {
      id: "net_change_tga",
      label: "Net Change TGA",
      data: lastWeekData.map((row) => ({
        x: row.date,
        y: parseFloat(row.net_change_tga),
      })),
    };
    const rrpLine = {
      id: "net_change_rrp",
      label: "Net Change RRP",
      data: lastWeekData.map((row) => ({
        x: row.date,
        y: parseFloat(row.net_change_rrp),
      })),
    };
    const result = [fedLine, tgaLine, rrpLine];
    return result;
  }, [data]);

  return (
    <Box m="1.25rem 2.5rem">
      <Header
        title="DAILY VIEW"
        subtitle="Daily net change for Fed, TGA, and RRP"
      />
      <Box mt="40px" height="70vh">
        <ResponsiveLine
          data={dataAndViews}
          {...props}
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
          }}
          margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
          xScale={{
            type: "time",
            format: "%Y-%m-%dT%H:%M:%S.%LZ",
            precision: "day",
            useUTC: false,
          }}
          xFormat="time:%m/%d/%y"
          yScale={{
            format: `>-,2f`,
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          
          yFormat=" >-,.2f"
          curve="catmullRom"
          enableArea={isDashboard}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (v) => {
             const date = new Date(v);
             return date.toLocaleDateString('en-US')
            },
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: "every day",
            legend: isDashboard ? "" : "Date",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            type: "linear",
            format: ">-.2~s",
            orient: "left",
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? "" : "Billions (USD)",
            legendOffset: -60,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          tooltipFormat={value => Number(value).toLocaleString("en-US", {minimumFractionDigits: 2}) + "$"}
          legends={
            !isDashboard
              ? [
                  {
                    anchor: "bottom-right",
                    // data: dataAndViews.map((item) => {
                    //   const color = { from: "theme" };

                    //   return {
                    //     color: hiddenIds.includes(item.id)
                    //       ? color
                    //       : "rgba(1, 1, 1, .1)",
                    //     id: item.id,
                    //     label: item.id,
                    //   };
                    // }),
                    direction: "column",
                    // onClick: (datum) => {
                    //   setHiddenIds((state) => 
                    //     state.includes(String(datum.id))
                    //     ? state.filter((item) => item !== datum.id)
                    //     : [...state, String(datum.id)]
                    //   );
                    // },
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
          tooltipProps={{ shared: true}}
        />
      </Box>
    </Box>
  );
};

export default Breakdown;
