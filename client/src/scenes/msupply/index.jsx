import React, { useState } from "react";
import Header from 'components/Header';
import { Box, useTheme, LinearProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useGetMSupplyQuery } from 'state/api';
import { DataGrid, GridPagination } from '@mui/x-data-grid';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
import OverviewChart from 'components/OverviewChart';
import StatBox from "components/StatBox";
import { styled } from "@mui/system";



const MSupply = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetMSupplyQuery();

  const BoldRow = styled("div")(({ theme }) => ({
    fontWeight: "bolder",
    // Apply additional styles as needed
  }));

  const [view, setView] = useState("M1");

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 0.4,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "M1",
      headerName: "M1 Supply",
      flex: 0.5,
      renderCell: (params) => {
        const isSelected = params.field === view;
        return (
          <span>
            {isSelected ? (
              <BoldRow>{`$${Number(params.value).toLocaleString(
                "en-US"
              )}`}</BoldRow>
            ) : (
              `$${Number(params.value).toLocaleString("en-US")}`
            )}
          </span>
        );
      },
    },
    {
      field: "M2",
      headerName: "M2 Supply",
      flex: 0.5,
      renderCell: (params) => {
        const isSelected = params.field === view;
        return (
          <span>
            {isSelected ? (
              <BoldRow>{`$${Number(params.value).toLocaleString(
                "en-US"
              )}`}</BoldRow>
            ) : (
              `$${Number(params.value).toLocaleString("en-US")}`
            )}
          </span>
        );
      },
    },
    {
      field: "M3",
      headerName: "M3 Supply",
      flex: 0.5,
      renderCell: (params) => {
        const isSelected = params.field === view;
        return (
          <span>
            {isSelected ? (
              <BoldRow>{`$${Number(params.value).toLocaleString(
                "en-US"
              )}`}</BoldRow>
            ) : (
              `$${Number(params.value).toLocaleString("en-US")}`
            )}
          </span>
        );
      },
    },
  ];
  
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONEY SUPPLY" subtitle="M1, M2, and M3 Supply data over time" />
      {/* ROW 1 */}
      <Box 
        mt="0px"
        height="50vh" 
        // gridColumn="span 8"
        gap="20px"
        p="20px"
      >
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}>
            <MenuItem value="M1">M1 Supply</MenuItem>
            <MenuItem value="M2">M2 Supply</MenuItem>
            <MenuItem value="M3">M3 Supply</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>

      {/* ROW 2 */}
      <Box
        mt="3rem"
        // display="grid"
        height="auto"
        gridColumn="span 12"
        gridRow="span 2"
        gap="1rem"
        p="1rem"
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
        }}>
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.date}
          rows={data || []}
          columns={columns}
          columnVisibilityModel={{
            _id: false,
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: "date", sort: "desc" }],
            },
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          slots={{
            toolbar: DataGridCustomToolbar,
            loadingOverlay: LinearProgress,
            // Pagination: GridPagination,
          }}
        />
      </Box>
    </Box>
  );
};

export default MSupply;