import React, { useState } from 'react';
import {
  Box,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
} from "@mui/material";
import { ExpandMoreOutlined } from '@mui/icons-material';
import Header from 'components/Header';

const Glossary = () => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Glossary"
        subtitle="Terms & Acronyms"
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
              M1 Supply:
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color={theme.palette.secondary[100]}>
              M1 tracks the currency in circulation and excludes instruments
              such as stocks and bonds. M1 considers:
              <List>
                <ListItem>
                  <Typography fontStyle="italic">
                    1. All physical currency held outside the Treasury, Federal
                    Reserve Banks, and depsoitory insitutions.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography fontStyle="italic">
                    2. Demand deposits to commercial banks, excluding those made
                    by the Federal Reserve, its subsidiaries, foreign banks, and
                    any additional U.S. Government accounts.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography fontStyle="italic">
                    3. Savings accounts, OCDs (interest-bearing debt
                    securities), and other checkable deposits.
                  </Typography>
                </ListItem>
              </List>
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
            <Typography>The M2 supply considers slightly less liquid despoits plus all the items that compose the M1 Supply. Additions include: </Typography>
            <List>
              <ListItem>
                <Typography fontStyle="italic">
                  1. Certificates of deposit (CDs) of less than $100,000.00.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  2. Retail balances held in Money Market Funds (MMFs).
                </Typography>
              </ListItem>
            </List>
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
            <Typography>
              The M3 formerly accounted for all currency in circulation, including dollars held in the reserves of foreign nations. As of 2006, 
              this was discontinued in favor of a per country split. Today, outside of aggregation, the M3 for the United States, should mirror the M2 supply.
            
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Glossary