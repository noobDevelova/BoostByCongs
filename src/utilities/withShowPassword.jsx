import React, { useState } from "react";

const withShowPassword = (OriginalComponent) => {
  return (props) => {
    const [show, setShow] = useState(false);
    const togglePasswordVisibility = () => {
      setShow(!show);
    };
    return (
      <OriginalComponent
        isShow={show}
        toggle={togglePasswordVisibility}
        {...props}
      />
    );
  };
};

export default withShowPassword;
