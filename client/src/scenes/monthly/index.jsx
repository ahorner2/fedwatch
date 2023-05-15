import React, { useMemo }  from 'react';
import { useTheme, Box } from '@mui/material';
import { ResponsiveBar, BarTooltipDatum } from '@nivo/bar';
import { useGetMonthlyQuery } from 'state/api';
import Header from 'components/Header';

const Monthly = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetMonthlyQuery();

  const dataWithViews = useMemo(() => {
    if (!data || isLoading) return [];

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const lastMonthData = sortedData.slice(-28);

    return lastMonthData.map((row) => ({
      date: row.date,
      fed: parseFloat(row.fed),
      tga: parseFloat(row.tga),
      rrp: parseFloat(row.rrp),
    }));
  }, [data]);

  return (
    <Box m="1.25rem 2.5rem">
      <Header
        title="MONTHLY VIEW"
        subtitle="Monthly Fed, TGA, and RRP movement"
      />
      <Box mt="40px" height="70vh">
        <ResponsiveBar
          data={dataWithViews}
          keys={["fed", "tga", "rrp"]}
          padding={0.4}
          indexBy="date"
          groupMode="stacked"
          layout="vertical"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          label={(d) => `${d.date}: ${d.value}`}
          labelFormat={(value, index) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
            });
          }}
          xScale={{
            type: "time",
            format: "%Y-%m-%dT%H:%M:%S.%LZ",
            precision: "day",
            useUTC: false,
          }}
          xFormat="time:%m %d %y"
          yScale={{
            type: "linear",
            min: "0",
            max: "auto",
            reverse: false,
          }}
          valueScale={{ type: "linear" }}
          valueFormat=">-,.2f"
          indexScale={{ type: "band", round: true }}
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
          enableGridX={false}
          enableGridY={false}
          useMesh={true}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (v) => {
              const date = new Date(v);
              return date.toLocaleDateString("en-US");
            },
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            format: ">,.2s",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "USD",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={1}
          labelSkipHeight={1000}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              cursor: "pointer",
              itemclick: function (e) {
                if (
                  typeof e.dataSeries.visible === "undefined" ||
                  e.dataSeries.visible
                ) {
                  e.dataSeries.visible = false;
                } else {
                  e.dataSeries.visible = true;
                }
              },
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Monthly;