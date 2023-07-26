import React from 'react';
import { makeStyles } from '@material-ui/core';
import LogoDarkZenika from '../../themes/logo_dark.svg';

const useStyles = makeStyles({
  svg: {
    width: 170,
    height: 52,
  },
});

const LogoFull = () => {
  const { svg } = useStyles();

  return <img src={LogoDarkZenika} alt="Logo Zenika" className={svg} />;
};

export default LogoFull;
