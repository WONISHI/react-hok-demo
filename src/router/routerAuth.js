import {  Navigate } from "react-router-dom";


export const RouterAuth = ({ children })=> {
  const token = localStorage.getItem("cookie");
  if (!token) {
    // @ts-ignore
    return <Navigate to="/login" replace></Navigate>;
  }
  return children;
};
