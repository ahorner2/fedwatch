import React, { useRef } from "react";

const CustomTooltip = ({ point, numElementsX }) => {
  const containerRef = useRef(null);
  // const xPosition = point.x; // cursor 'x' position 
  const isFirstHalf = point.index < numElementsX / 2;

  return (
    <div className="chart-container">
      <div
        ref={containerRef}
        className="tooltip-container"
        style={isFirstHalf ? { left: 0 } : { right: 0 }}
      >
        <div>{point.data.xFormatted}</div>
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
