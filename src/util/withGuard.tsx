import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const withGuard = (Component) => {
  return (props) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated]);
    return isAuthenticated ? <Component {...props} /> : null;
  };
};

export default withGuard;
