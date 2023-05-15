import React from "react";

const exportToCSV = (data, fileName) => {
  const csvRows = [];

  data.forEach((item) => {
    const values = Object.values(item).map(value => 
      {
        if (typeof value === "string") {
          return `"${value}"`;
        } else {
          return value;
        }
      });
      const row = values.join(",");
      csvRows.push(row);
    });
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    
    // create dl link with click evt 
    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    document.body.appendChild("a");
    a.click();
    document.body.removeChild("a");
    URL.revokeObjectURL(url);
};

export default exportToCSV;

// function DownloadReports({ data }) {
//   const theme = useTheme();

//   const downloadFile = ({ data, fileName, fileType, isDashboard = false }) => {
//     const blob = new Blob([data], { type: fileType });
//     const a = document.createElement("a");
//     a.download = fileName;
//     a.href = window.URL.createObjectURL(blob);
//     const clickEvt = new MouseEvent("click", {
//       view: window,
//       bubbles: true,
//       cancelable: true,
//     });
//     a.dispatchEvent(clickEvt);
//     a.remove();
//   };

//   const exportToCSV = (e) => {
//     e.preventDefault();
//     const headers = [
//       "date",
//       "fed",
//       "net_change_fed",
//       "tga",
//       "net_change_tga",
//       "rrp",
//       "net_change_rrp",
//       "net_liquidity",
//       "net_change_net_liquidity",
//       "spx",
//     ];
//     const csv = [headers.join(",")];

//     data.forEach((row) => {
//       const values = [
//         row.date,
//         row.fed,
//         row.net_change_fed,
//         row.tga,
//         row.net_change_tga,
//         row.rrp,
//         row.net_change_rrp,
//         row.net_liquidity,
//         row.net_change_net_liquidity,
//         row.spx,
//       ];
//       csv.push(values.join(","));
//     });

//     const csvString = csv.join("\n");
//     downloadFile({
//       data: csvString,
//       fileName: "net-liquidity.csv",
//       fileType: "text/csv",
//     });
//   };

//   return (
//     <Box>
//       <Button
//         sx={{
//           backgroundColor: theme.palette.secondary.light,
//           color: theme.palette.background.alt,
//           fontSize: "14px",
//           fontWeight: "bold",
//           padding: "10px 20px",
//         }}
//         onClick={DownloadReports}>
//         <CloudDownloadOutlined sx={{ mr: "10px" }} />
//         Download .csv
//       </Button>
//     </Box>
//   );
// }

// export default DownloadReports;