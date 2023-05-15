import React from 'react';
import { Box } from '@mui/material';
import BreakdownChart from 'components/BreakdownChart';
import Header from 'components/Header';

const Breakdown = () => {
  return (
    <Box m="1.25rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Current net liquidity breakdown" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;