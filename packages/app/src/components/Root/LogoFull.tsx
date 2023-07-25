import React from 'react';
import { makeStyles } from '@material-ui/core';
import LogoZenika from '../../themes/zenika.svg';

const useStyles = makeStyles({
  svg: {
    width: 96,
    height: 96,
  },
});

const LogoFull = () => {
  const classes = useStyles();

  return (
    <img src={LogoZenika} alt="Logo Zenika" className={classes.svg} />
  );
};

export default LogoFull;
