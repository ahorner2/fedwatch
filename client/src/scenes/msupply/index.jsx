import React, { useState } from "react";
import Header from 'components/Header';
import {
  Box,
  useTheme,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useGetMSupplyQuery } from 'state/api';
import { DataGrid } from '@mui/x-data-grid';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
import OverviewChart from 'components/OverviewChart';
import StatBox from "components/StatBox";
import { styled } from "@mui/system";
import { HelpOutlineOutlined } from "@mui/icons-material";



const MSupply = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetMSupplyQuery();

  const BoldRow = styled("div")(({ theme }) => ({
    fontWeight: "bolder",
    // Apply additional styles as needed
  }));
  const [view, setView] = useState("M1");
  const m1Data = data?.map((value) => parseFloat(value.M1));
  const m2Data = data?.map((value) => parseFloat(value.M2));

  const currentM1 = m1Data?.[m1Data.length - 1];
  const currentM2 = m2Data?.[m2Data.length - 1];

  // mnothly % change for M1 / M2 
  const previousM1 = m1Data?.[m1Data.length - 2];
  const previousM2 = m2Data?.[m2Data.length - 2];
  const m1PercentageChange = ((currentM1 - previousM1) / previousM1) * 100;
  const m2PercentageChange = ((currentM2 - previousM2) / previousM2) * 100;

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
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          M1 Supply {" "}
          <Tooltip 
            title="All currency NOT held within the U.S. Treasury, the Federal Reserve, depository institutions, or the plethora of commercial banking and financial implementations." 
            placement="top"
          >
            <HelpOutlineOutlined fontSize="small" />
          </Tooltip>
        </div>
      ),
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
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          M2 Supply {" "}
          <Tooltip title="M2 consists of M1 plus deposits of less than $100,000.00, as well as money held in individual retirment accounts, depository institutions, and within retail money market funds. " placement="top">
            <HelpOutlineOutlined fontSize="small" />
          </Tooltip>
        </div>
      ),
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
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          M3 Supply{" "}
          <Tooltip title="M3 is now broken down by country, with the US M3 acting as a mirror to the M2 Supply." placement="top">
            <HelpOutlineOutlined fontSize="small" />
          </Tooltip>
        </div>
      ),
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
      <Header
        title="MONEY SUPPLY"
        subtitle="M1, M2, and M3 Supply data over time"
      />
      {/* ROW 1 */}
      <Box
        mt="0px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        p="1rem"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}>
        <Box
          gridColumn="span 2"
          gridRow="span 3"
          display="flex"
          flexDirection="column"
          gap="20px">
          <StatBox
            title="M1 Supply"
            subtitle={false}
            increase={m1PercentageChange.toFixed(2) + "%"}
            description={"Over the last month"}
            value={currentM1}
          />
          <StatBox
            title="M2 Supply"
            subtitle={false}
            increase={m2PercentageChange.toFixed(2) + "%"}
            description={"Over the last month"}
            value={currentM2}
          />
          <StatBox
            title="Current M3 (US)"
            subtitle={false}
            increase={false}
            description={"Should be equal to M2"}
            value="20.82T"
          />
        </Box>
        <Box
          display="flex-column"
          gridColumn="span 10"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="2rem 4rem 4rem 2rem"
          borderRadius="0.55rem">
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
      </Box>

      {/* ROW 2 */}
      <Box
        // mt="3rem"
        display="grid"
        height="auto"
        gridColumn="span 10"
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
          gridColumn="span 12"
        />
      </Box>
    </Box>
  );
};

export default MSupply;