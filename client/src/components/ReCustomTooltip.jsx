import React, { useRef } from "react";
import moment from "moment";

const ReCustomTooltip = ({ active, payload, label }) => {
  const containerRef = useRef(null);

  if (active && payload && payload.length) {
    const point = payload[0];
    const formattedDate = moment(point.payload.x || point.payload.date).format("MMM D, YYYY");
    const formattedValues = parseFloat(point.value).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });

    return (
      <div className="chart-container">
        <div ref={containerRef} className="tooltip-container">
          <div className="tooltip-date">{formattedDate}</div>
          <div className="tooltip-content">
            <div className="tooltip-marker" />
            <div className="tooltip-value">${formattedValues}</div>
          </div>
        </div>
      </div>
    );
  }

  return null; // Return null when there is no valid tooltip data
};
      

export default ReCustomTooltip;
