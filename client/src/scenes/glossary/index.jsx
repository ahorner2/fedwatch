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
  Button,
} from "@mui/material";
import { ExpandMoreOutlined } from '@mui/icons-material';
import Header from 'components/Header';

const Glossary = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState([false, false, false, false, false, false, false, false, false]);
  const [globalExpanded, setGlobalExpanded] = useState(false);

  const handleToggle = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const handleToggleAll = () => {
    const allExpanded = expanded.every((item) => item === true);
    setExpanded(Array.from({ length: expanded.length }, () => !allExpanded));
    setGlobalExpanded(!allExpanded);
  };
  
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Glossary" subtitle="Terms & Acronyms" />

      <Button onClick={handleToggleAll}>
        {expanded.every((item) => item === true) ? "Collapse All" : "Open All"}
      </Button>

      <Box mt="20px" mb="20px">
        {/* Net Liq defined */}
        <Accordion
          expanded={expanded[0]}
          onChange={() => handleToggle(0)}
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
        {/* FED Defined */}
        <Accordion
          expanded={expanded[1]}
          onChange={() => handleToggle(1)}
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
              Federal Reserve (Fed):
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>
                The Federal Reserve is the central bank of the United States,
                and is responsible for crafting and conducting monetary policies
                meant to promote sustainable economic growth. The balance sheet,
                then, dictates how these goals are accomplished. By routing
                funds through its various arms, the Fed descides when and how to
                reduce or expand its holdings. As an, admittedly,
                oversimplification:
              </strong>
            </Typography>
            <List>
              <ListItem>
                <Typography fontStyle="italic">
                  1. When the Fed purchases securities from the TGA, it seeks to
                  increase price and shrink yields, while also signaling a
                  "loosening" monetary policy to prop up external markets.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  2. Conversely, when the Fed sells Treasury assets, it signals
                  a "tightening" in the money supply that appends constraints to
                  economic conditions and asset values. In other words, when the
                  Fed begins to sell, external markets drop in turn. The Fed has
                  steadily and dramatically increased its security holdings to
                  better cushion the shock of the 2008 financial crisis and
                  later the COVID-19 epidemic.
                </Typography>
              </ListItem>
            </List>
            <br />
            <Typography>
              <strong>
                The Fed has another investment arm quite recent in its
                development. The System Open Market Account (SOMA), through
                which securities are actively traded on the open market.
                <br />
                <br />
                In recent years the SOMA's become a critical tool for several
                purposes:
              </strong>
              <List>
                <ListItem>
                  <Typography fontStyle="italic">
                    1. Managing the Fed's trove of assets, particularly those
                    acquired in the wake of the 2008 financial crisis.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography fontStyle="italic">
                    2. As a store of emergency liquidity.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography fontStyle="italic">
                    3. As collateral for its liabilities.
                  </Typography>
                </ListItem>
              </List>
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* Treasury General Acc */}
        <Accordion
          expanded={expanded[2]}
          onChange={() => handleToggle(2)}
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
            <Typography variant="h5">
              Treasury General Account (TGA):
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>
                The TGA can be thought of as the Federal Reserve's checking
                account, from which the U.S. Government makes its payments. It's
                maintained by designation parties, primarily Federal Reserve
                Banks and their subsidiaries, with the goal of handling
                day-to-day money transactions including:
              </strong>
            </Typography>
            <List>
              <ListItem>
                <Typography fontStyle="italic">
                  1. Tax deposits and customs duties.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  2. Public debt receipts, or obligations to pay agreed upon
                  sums to holders at a later date.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  3. Proceeds from security sales in the from of Treasury bonds
                  (T-bills) and cash management bills, which are cash-esque
                  securities used as collateral for both repo borrowing and
                  hedging derivative trades.
                </Typography>
              </ListItem>
            </List>
            <br />
            <Typography>
              <strong>
                The Treasury General Account Program is made up of three
                distinct services used to check deposits and receive cash:
              </strong>
              <List>
                <ListItem>
                  <Typography fontStyle="italic">
                    1. The TGA Network, or a conglomerate of commerical
                    financial institutions tasked with receiving and reconciling
                    over-the-counter (OTC) cash and check deposits for
                    government agencies.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography fontStyle="italic">
                    2. The Seized Currency Collection (SCCN), which specializes
                    in corralling funds seized by law enforcement.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography fontStyle="italic">
                    3. The Mail-in TGA (MITGA) only receives deposits sent in
                    via mail by various agencies.
                  </Typography>
                </ListItem>
              </List>
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* RRP and ON RPP */}
        <Accordion
          expanded={expanded[3]}
          onChange={() => handleToggle(3)}
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
            <List>
              <ListItem>
                <Typography fontStyle="italic">
                  1. All physical currency held outside the Treasury, Federal
                  Reserve Banks, or depsoitory insitutions. "Depository
                  institution" is a catch-all term used for commerical banks,
                  savings and loan associations, and credit unions.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  2. Demand deposits to commercial banks, excluding those made
                  by the Federal Reserve, its subsidiaries, foreign banks, and
                  any additional U.S. Government accounts.
                </Typography>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        {/* FED Assets & Liabilities */}
        <Accordion
          expanded={expanded[4]}
          onChange={() => handleToggle(4)}
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
              Federal Assets & Liabilities:
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Like any balance sheet, the Federal Reserve's (Fed) tracks its
              assets and liabilites.
              <br />
              <br />
              <strong>The Fed's primary assets include:</strong>
            </Typography>
            <List>
              <ListItem>
                <Typography fontStyle="italic">
                  1. Treasury notes and bonds (T-bills).
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  2. Agency mortgage-backed securities (MBS) - an initiative
                  first introduced in January 2009, and reinstated at the peak
                  of COVID-19 crisis in March of 2022. The MBS is a $1.25
                  trillion program used to purchase interest-bearing securities
                  composed of parcels of home loans purchased from the
                  loan-originating banks. Agency MBS works very similarly, but
                  with the express goal of purchasing MBS from
                  government-sponsored entities.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  3. Proceeds from security sales in the from of Treasury bonds
                  (T-bills) and cash management bills, which are cash-esque
                  securities used as collateral for both repo borrowing and
                  hedging derivative trades.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  4. The ever-vague "Other" category. Here, the primary Fed
                  asset includes the loans extended to banks thorugh the repo
                  and discount window vehicles. Note: The "discount window"
                  allows banks that are unable to borrow from peers in the
                  federal funds market, to borrow directly from the central bank
                  by paying the federal discount rate (the interst rate set on
                  loans extended via the central bank).
                </Typography>
              </ListItem>
            </List>
            <Typography>
              <strong>
                Where there's assets, there's liabilities. The Fed's include:
              </strong>
            </Typography>
            <List>
              <ListItem>
                <Typography fontStyle="italic">
                  1. Historically, currency in curculation represented the Fed's
                  largest liability, this was, however, surpassed in 2010 by
                  bank reserves on deposit with the Fed. Since 2019, this
                  overnight rate has been the primary tool used in setting the
                  federal funds rate.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  2. Reverse Repurchase Agreements, or reverse repos, see
                  commercial counterparties lend excess funds to the Fed in
                  return for interest on the sum.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  3. Cash held by banking institutions and by the Treasury,
                  including reserves in the case of banks, and cash balances
                  held in the Treasury.
                </Typography>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        {/* TGA Assets & Liabilities */}
        <Accordion
          expanded={expanded[5]}
          onChange={() => handleToggle(5)}
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
              TGA Assets & Liabilites:
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>
                The Treasury's assets lie in contrast to the Federal Reserve,
                and are primarily comprised of the cash it holds in its
                "checking account", the TGA. It's liabilities are similarly
                straight-forward - the securities it manages.
              </strong>
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* M1 Supply */}
        <Accordion
          expanded={expanded[6]}
          onChange={() => handleToggle(6)}
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
              <strong>
                M1 tracks the most liquid portion of the money supply including
                all coins, currencies, banknotes, and overnight deposits in
                circulation, while excluding instruments like stocks and bonds.
                M1 considers:
              </strong>
              <List>
                <ListItem>
                  <Typography fontStyle="italic">
                    1. All physical currency held outside the Treasury, Federal
                    Reserve Banks, or depsoitory insitutions. "Depository
                    institution" is a catch-all term used for commerical banks,
                    savings and loan associations, and credit unions.
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
        {/* M2 Supply */}
        <Accordion
          expanded={expanded[7]}
          onChange={() => handleToggle(7)}
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
            <Typography>
              <strong>
                The M2 offers a broader measure of an economies money supply. It
                includes all items comprising the M1 plus slightly less liquid
                despoits often referred to as "near-money". Additions include:
              </strong>
            </Typography>
            <List>
              <ListItem>
                <Typography fontStyle="italic">
                  1. Savings accounts in commerical banks, which are not
                  "checkable", but from which money can be easily withdrawn from
                  a bank teller or ATM.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  2. Retail balances held in Money Market Funds (MMFs) for
                  short-term T-bonds.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontStyle="italic">
                  2. A rather small addition in the overall breakdown is
                  Certificates of deposit (CDs) of less than $100,000.00,
                  wherein a depositor commits to parking funds in a bank for a
                  set and agreed upon time period. This can range from months to
                  years, with interest rates climbing in tandem with lock-up
                  length.
                </Typography>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        {/* M3 Suuply */}
        <Accordion
          expanded={expanded[8]}
          onChange={() => handleToggle(8)}
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
              <strong>
                The M3 formerly accounted for all currency in circulation,
                including dollars held in the reserves of foreign nations. As of
                2006, this was discontinued in favor of a per country split.
                Today, outside of aggregation, the M3 for the United States
                should mirror the M2 supply.
              </strong>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Glossary