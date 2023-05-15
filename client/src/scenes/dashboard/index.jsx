import React from 'react';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import {
  CurrencyExchangeOutlined,
  // CloudDownloadOutlined,
  TodayOutlined,
  AccountBalanceOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";
import {
  Box,
  // Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import { useGetDashboardStatsQuery } from "state/api";
import StatBox from "components/StatBox";
import NetChart from 'components/NetChart';


const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardStatsQuery({}, { _id: 0, net_change_fed: 0, net_change_tga: 0, net_change_rrp: 0, net_change_net_liquidity: 0 });

  const downloadFile = ({ data, fileName, fileType }) => {
    // create blob from array data for csv dl
    const blob = new Blob([data], { type: fileType });
    // create anchor ele with a click evt attached
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  // eslint-disable-next-line
  const exportToCSV = (e) => {
    e.preventDefault();
    let headers = [
      "date,fed,net_change_fed,tga,net_change_tga,rrp,net_change_rrp,net_liquidity,net_change_net_liquidity,spx",
    ];

    let balanceCsv = data.allData.reduce((acc, balance) => {
      const {
        date,
        fed,
        net_change_fed,
        tga,
        net_change_tga,
        rrp,
        net_change_rrp,
        net_liquidity,
        net_change_net_liquidity,
        spx,
      } = balance;
      acc.push(
        [
          date,
          fed,
          net_change_fed,
          tga,
          net_change_tga,
          rrp,
          net_change_rrp,
          net_liquidity,
          net_change_net_liquidity,
          spx,
        ].join(",")
      );
      return acc;
    }, []);

    downloadFile({
      data: [...headers, ...balanceCsv.join("\n")],
      fileName: "net-liquidity.csv",
      fileType: "text/csv",
    });
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.75,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        });
        return formattedDate
      },
    },
    {
      field: "fed",
      headerName: "Fed",
      flex: 1,
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
    // {
    //   field: "net_change_fed",
    //   headerName: "Net Change Fed",
    //   flex: 1,
    //   cellClassName: (params) =>
    //     params.value < 0 ? "red-cell" : params.value > 0 ? "green-cell" : "",
    //   renderCell: (params) =>
    //     `$${Number(params.value).toLocaleString("en-US")}`,
    // },
    {
      field: "rrp",
      headerName: "RRP",
      flex: 1,
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
    // {
    //   field: "net_change_rrp",
    //   headerName: "Net Change RRP",
    //   flex: 1,
    //   cellClassName: (params) =>
    //     params.value < 0 ? "red-cell" : params.value > 0 ? "green-cell" : "",
    //   renderCell: (params) =>
    //     `$${Number(params.value).toLocaleString("en-US")}`,
    // },
    {
      field: "tga",
      headerName: "TGA",
      flex: 1,
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
    // {
    //   field: "net_change_tga",
    //   headerName: "Net Change TGA",
    //   flex: 1,
    //   cellClassName: (params) =>
    //     params.value < 0 ? "red-cell" : params.value > 0 ? "green-cell" : "",
    //   renderCell: (params) =>
    //     `$${Number(params.value).toLocaleString("en-US")}`,
    // },
    {
      field: "net_liquidity",
      headerName: "Net Liquidity",
      flex: 1,
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
    {
      field: "net_change_net_liquidity",
      headerName: "Change Net Liquidity",
      flex: 1,
      cellClassName: (params) =>
        params.value < 0 ? "red-cell" : params.value > 0 ? "green-cell" : "",
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
    {
      field: "spx",
      headerName: "SPX",
      flex: 1,
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Federal Balance Tracker" />
        <Box>
          {/* <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={exportToCSV}
            >
            <CloudDownloadOutlined sx={{ mr: "10px" }} />
            Download .csv
          </Button> */}
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}>
        {/* Row 1 */}
        <StatBox
          title="Total % Change"
          value={data && data.netPctChangeTotal}
          increase={false}
          description={false}
          icon={
            <CurrencyExchangeOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="7-day % Change"
          value={data && data.netPctChangeWeekly}
          increase={false}
          description={false}
          icon={
            <TodayOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem">
          <NetChart isDashboard={true} />
        </Box>
        <StatBox
          title="Current Net Liquidity"
          value={data && data.dailyNet}
          increase={data && data.netPctChangeDaily}
          description="In the last 24 hours"
          icon={
            <AccountBalanceOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="30-day % Change"
          value={data && data.netPctChangeMonthly}
          increase={false}
          description={false}
          icon={
            <CalendarMonthOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}>
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.table) || []}
            columns={columns}
            columnVisibilityModel={{
              _id: false,
              spx: false,
            }}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem">
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Net Liquidity By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}>
            Breakdown of federal net liquidity, defined as Fed - (TGA + RRP).
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;