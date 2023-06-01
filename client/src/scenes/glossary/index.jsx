import React, { useState } from 'react';
import {
  Box,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMoreOutlined } from '@mui/icons-material';
import Header from 'components/Header';

const Glossary = () => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Glossary & FAQ"
        subtitle="Terms, Acronyms, and Frequently Asked Questions"
      />
      <Box mt="20px">
        <Accordion
          defaultExpanded
          sx={{
            "& .MuiButtonBase-root": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[200],
            },
            "& .MuiCollapse-root": {
              backgroundColor: theme.palette.background.alt,
            },
          }}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography color={theme.palette.secondary[200]} variant="h5">
              Federal Net Liquidity:
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              All balances held by the Federal Reserve excluding the sum of
              funds held in the Treasury General Account and in Reverse
              Repurchase Agreements.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          defaultExpanded
          sx={{
            "& .MuiButtonBase-root": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[200],
            },
            "& .MuiCollapse-root": {
              backgroundColor: theme.palette.background.alt,
            },
          }}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography color={theme.palette.secondary[200]} variant="h5">
              Treasury General Account (TGA):
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The TGA can be thought of as the Federal Reserve's checking
              account. Its assets are cash held in the account, while its
              liabilities are the securities it issues.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          defaultExpanded
          sx={{
            "& .MuiButtonBase-root": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[200],
            },
            "& .MuiCollapse-root": {
              backgroundColor: theme.palette.background.alt,
            },
          }}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography color={theme.palette.secondary[200]} variant="h5">
              Reverse Repurchase Agreements (RRP):
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              RRP, or reverse repo transactions, occur when the FED sells
              Treasury bonds to a counterparty, with agreement to repurchase the
              same security at a later date. The ON RPP (Overnight RRP) facility
              sees the most use as a tool to keep the federal fund rate in line
              with projections established by the Federal Open Market Committee
              (FOMC).
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          defaultExpanded
          sx={{
            "& .MuiButtonBase-root": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[200],
            },
            "& .MuiCollapse-root": {
              backgroundColor: theme.palette.background.alt,
            },
          }}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography color={theme.palette.secondary[200]} variant="h5">
              How do the Fed, TGA, and RRP line items work to influence Federal
              Balance Sheet?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Like any institution, the Federal Reserve has its assets and its
              liabilites. The Federal Reserve's primary asset is the money it
              issues.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          defaultExpanded
          sx={{
            "& .MuiButtonBase-root": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[200],
            },
            "& .MuiCollapse-root": {
              backgroundColor: theme.palette.background.alt,
            },
          }}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography color={theme.palette.secondary[200]} variant="h5">
              M1 Supply:
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The M1 Supply consists of all currency, demand deposits, and
              liquid deposits such as savings accounts. M1 tracks the most
              liquid sectors of the money supply, and excludes financial
              instruments such as stocks, bonds, etc.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          defaultExpanded
          sx={{
            "& .MuiButtonBase-root": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[200],
            },
            "& .MuiCollapse-root": {
              backgroundColor: theme.palette.background.alt,
            },
          }}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography color={theme.palette.secondary[200]} variant="h5">
              M2 Supply:
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>The M2 Supply...</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded
          sx={{
            "& .MuiButtonBase-root": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[200],
            },
            "& .MuiCollapse-root": {
              backgroundColor: theme.palette.background.alt,
            },
          }}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography color={theme.palette.secondary[200]} variant="h5">
              M3 Supply:
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>The M3 Supply...</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Glossary