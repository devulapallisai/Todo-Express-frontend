import React from "react";

const Requireauth = (Component: any) => {
  return (props: any) => {
    const token = localStorage.getItem("Token");
    if (!token) {
      window.location.href = "/";
    }
    return <Component {...props} />;
  };
};

export default Requireauth;
