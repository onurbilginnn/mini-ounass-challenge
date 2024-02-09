import React from "react";
import "./ErrorText.less";

const ErrorText = ({ children, color }) => (
  <p className="Error-text" style={{ color }}>
    {children}
  </p>
);
export default ErrorText;
