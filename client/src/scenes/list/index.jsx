import React from "react";
import { Box, LinearProgress, useTheme, Tooltip } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { HelpOutlineOutlined } from "@mui/icons-material";
import { useGetListQuery } from "state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const List = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetListQuery();

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
        const formattedDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "fed",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          Fed{" "}
          <Tooltip
            title="Each balance sheet category has its assets and liabilities. The Fed's primary assets are Treasury securities, while its liabilities include reserves held by banks, cash balances held by the Treasury, and ON RPP balances held by MMFs."
            placement="top">
            <HelpOutlineOutlined fontSize="small" />
          </Tooltip>
        </div>
      ),
      flex: 1,
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
    {
      field: "net_change_fed",
      headerName: "Net Change Fed",
      flex: 1,
      cellClassName: (params) =>
        params.value < 0 ? "red-cell" : params.value > 0 ? "green-cell" : "",
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
    {
      field: "rrp",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          RRP{" "}
          <Tooltip
            title="A reverse repurchase agreement sees the Desk sell securities through its System Open Market Account (SOMA) with an agreement to repurchase the same security at a specified price and time. This leaves the SOMA portfolio balanced, temporarily shifting Fed liabilities to to despository institutions."
            placement="top">
            <HelpOutlineOutlined fontSize="small" />
          </Tooltip>
        </div>
      ),
      flex: 1,
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
    {
      field: "net_change_rrp",
      headerName: "Net Change RRP",
      flex: 1,
      cellClassName: (params) =>
        params.value < 0 ? "red-cell" : params.value > 0 ? "green-cell" : "",
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
    {
      field: "tga",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          TGA{" "}
          <Tooltip
            title="The Treasury General Account can be thought of as the Fed's checking account. Its assets include all cash deposits held within the account, while its liabilities are represented by the securities it issues."
            placement="top">
            <HelpOutlineOutlined fontSize="small" />
          </Tooltip>
        </div>
      ),
      flex: 1,
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
    {
      field: "net_change_tga",
      headerName: "Net Change TGA",
      flex: 1,
      cellClassName: (params) =>
        params.value < 0 ? "red-cell" : params.value > 0 ? "green-cell" : "",
      renderCell: (params) =>
        `$${Number(params.value).toLocaleString("en-US")}`,
    },
    {
      field: "net_liquidity",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          Net Liquidity {" "}
          <Tooltip
            title="Net Liquidity = FED - (TGA + RRP)"
            placement="top">
            <HelpOutlineOutlined fontSize="small" />
          </Tooltip>
        </div>
      ),
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
    <Box m="1.25rem  2.5rem">
      <Header title="LIST VIEW" subtitle="Current Net Liquidity" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBotttom: "none",
          },
          "& .MuiDataGrid-columnHeader": {
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
            borderBottom: "none",
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          columnVisibilityModel={{
            _id: false,
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'desc'}]
            },
          }}
          slots={{ 
            toolbar: DataGridCustomToolbar,
            loadingOverlay: LinearProgress,
          }}
          slotProps={{
            // toolbar: { searchInput, setSearchInput, setSearch }
          }}
        />
      </Box>
    </Box>
  );
};

export default List;
