import React from 'react';
import { ClipLoader } from 'react-spinners';
import { PacmanLoader } from 'react-spinners';
import { ClimbingBoxLoader  } from 'react-spinners';

export const ClipSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader size={50} color={"#123abc"} loading={true} />
    </div>
  );
};

export const PacSpinner = () => {
    return (
      <div className="flex items-center ">
        <PacmanLoader size={10}  color={"#808080"} speedMultiplier={3} loading={true} />
      </div>
    );
  };

  export const ClimbSpinner = () => {
    return (
      <div className="flex items-center ">
        <ClimbingBoxLoader size={30}  color={"#808080"} speedMultiplier={1} loading={true} />
      </div>
    );
  };

export default ClipSpinner