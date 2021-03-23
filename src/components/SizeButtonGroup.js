import React from "react";

function SizeButtonGroup({ setValue }) {
  const sizeRange = ["xs", "s", "m", "l"];

  const radioProps = {
    type: "radio",
    name: "sizes",
  };

  return (
    <div className="sizeBtnGroup">
      {sizeRange.map((size) => (
        <span key={size}>
          <input
            id={`radio-${size}`}
            {...radioProps}
            onChange={() => setValue(size.toUpperCase())}
          />
          <label htmlFor={`radio-${size}`}>{size.toUpperCase()}</label>
        </span>
      ))}
    </div>
  );
}

export default SizeButtonGroup;
