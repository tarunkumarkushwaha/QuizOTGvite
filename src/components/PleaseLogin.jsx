import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PleaseLogin = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <div className="mainbg bg-no-repeat bg-left min-h-screen flex justify-center items-center p-10 flex-col">
        {loading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress color="inherit" size={80} />
          </Box>
        ) : (
          <>
            <h1 className="smooth-entry text-3xl text-lime-800 font-sans">Please LOgin</h1>
            <button
              type="button"
              className="smooth-entry h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <Link to={"/login"}>login</Link>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default PleaseLogin;
