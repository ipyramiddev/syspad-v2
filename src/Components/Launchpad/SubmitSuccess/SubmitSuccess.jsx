import React from 'react';
import { useFormikContext } from 'formik';
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import "./index.scss";

function SubmitSuccess() {
  return (
    <React.Fragment>
      <div className="submit-success-pane text-center text-white">
        <Typography variant="h5">
          IDO Project is successfully created!
        </Typography>
        <Typography variant="subtitle1">
          You can check your project <Link to="/home">here</Link>.
        </Typography>
      </div>
    </React.Fragment>
  );
}

export default SubmitSuccess;
