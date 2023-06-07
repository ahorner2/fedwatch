import React, { useMemo } from "react";
import { Box, useTheme } from '@mui/material';
import { useGetNetQuery } from 'state/api';
import Header from 'components/Header';
import ReNetChart from "components/ReNetChart";

const Net = ({ isDashboard = false }) => {
  // eslint-disable-next-line
  const theme = useTheme();
  const { data, isLoading } = useGetNetQuery();

  // eslint-disable-next-line
  const dataNetLiquidity = useMemo(() => {
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
  }, [data, isLoading]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="NET LIQUIDITY"
        subtitle={"Federal net liquidity per day"}
      />
      <Box mt="40px" height="75vh">
        <ReNetChart />
      </Box>
    </Box>
  );
};

export default Net;