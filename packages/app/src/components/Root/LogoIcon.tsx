import React from 'react';
import { makeStyles } from '@material-ui/core';

import LogoZenika from '../../themes/logo_dark.svg';

const useStyles = makeStyles({
  svg: {
    width: 170,
    height: 52,
    marginLeft: '-12px',
  },
});

const LogoIcon = () => {
  const { svg } = useStyles();

  return <img src={LogoZenika} alt="Logo Zenika" className={svg} />;
};

export default LogoIcon;
