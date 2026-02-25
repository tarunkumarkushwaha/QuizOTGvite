import { CircularProgress } from '@mui/material';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 transition-colors">
      <CircularProgress size={60} thickness={4} color="primary" />
      <p className="text-gray-800 text-base font-medium">
        {text}
      </p>
    </div>
  );
};

export default LoadingSpinner;
