import { useRef } from "react";

const ToolTip = ({ children, tooltip }) => {
  const tooltipRef = useRef(null);
  const container = useRef(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = `calc(${clientX - left}px - 50%)`;
      }}
      className="group relative inline-block"
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="tooltip invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-800 text-white text-sm px-2 py-1 rounded-lg absolute top-full whitespace-nowrap transform -translate-x-1/2"
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export default ToolTip;