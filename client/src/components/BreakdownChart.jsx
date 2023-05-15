import React from 'react';
import { useGetBreakdownQuery } from 'state/api';
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from '@nivo/pie';

const BreakdownChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetBreakdownQuery();

  if (!data || isLoading) return "Loading...";

  const colors = [
    theme.palette.secondary[200],
    theme.palette.secondary[300],
    theme.palette.secondary[400],
  ];
  // eslint-disable-next-lin
  const { fed, tga, rrp, net_liquidity } = data;

  const formattedData = [
    { id: "FED", label: "Fed", value: fed, color: colors[2] },
    { id: "TGA", label: "TGA", value: tga, color: colors[0] },
    { id: "RRP", label: "RRP", value: rrp, color: colors[1] },
    // { label: "Net Liquidity", value: net_liquidity },
  ];

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined} // Box dep on h not w
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative">
      <ResponsivePie
        data={formattedData}
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
        valueFormat={(value) =>
          `$${value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            notation: isDashboard ? "compact" : "standard"
          })}`
        }
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[300]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}>
        <Typography variant="h6">
          {!isDashboard && "Net Liquidity:"} 
          {data.net_liquidity.toLocaleString(undefined, {
            style: "currency", 
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            notation: isDashboard ? "compact" : "standard"
          })}
        </Typography>
      </Box>
    </Box>
  );
}

export default BreakdownChart