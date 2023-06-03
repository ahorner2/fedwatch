import React, { useRef } from "react";
import moment from "moment";

const CustomTooltip = ({ point, numElementsX }) => {
  const containerRef = useRef(null);
  const isFirstHalf = point.index < numElementsX / 2;

  const formattedDate = moment(point.data.xFormatted, "MMM-DD-YY").format(
    "MMM D, YYYY"
  );

  return (
    <div className="chart-container">
      <div
        ref={containerRef}
        className="tooltip-container"
        style={isFirstHalf ? { left: 0 } : { right: 0 }}
      >
        <div>{formattedDate}</div>
        <div>
          <span
            style={{
              display: "inline-flex",
              position: "relative",
              marginRight: "4px",
              borderRadius: "10px",
              width: "10px",
              height: "10px",
              backgroundColor: "#335cd7",
            }}
          />
          &nbsp;&nbsp;{point.data.yFormatted}
        </div>
      </div>
    </div>
  );
};

export default CustomTooltip;
