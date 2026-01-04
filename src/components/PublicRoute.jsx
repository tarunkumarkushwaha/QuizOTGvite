import { useContext } from 'react';
import { Context } from '../MyContext';
import {  Navigate } from "react-router-dom"
const PublicRoute = ({ children }) => {
  const { accessToken } = useContext(Context);
  return accessToken ? <Navigate to="/testsetting" replace /> : children;
};


export default PublicRoute