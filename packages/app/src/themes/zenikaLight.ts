import {
  createUnifiedTheme,
  themes,
  genPageTheme,
  shapes,
  UnifiedThemeOptions,
} from '@backstage/theme';

const colors = {
  error: '#EE2238',
  warning: '#00EB84',
  info: '#F4C042',
  success: '#4CA8E7',
  text: '#1E1E1E',
  link: '#00EB84',
  bgMain: '#F2F2F2',
  bgSecondary: '#FFFFFF',
};

const defaultTheme = themes.light.getTheme('v5');

const newOptions: UnifiedThemeOptions = {
  palette: {
    ...(defaultTheme as UnifiedThemeOptions).palette,
    primary: {
      main: colors.text,
    },
    secondary: {
      main: colors.link,
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
    info: {
      main: colors.info,
    },
    success: {
      main: colors.success,
    },
    background: {
      default: colors.bgMain,
      paper: colors.bgSecondary,
    },
    banner: {
      info: colors.info,
      error: colors.error,
      text: colors.text,
      link: colors.link,
    },
    errorBackground: colors.error,
    warningBackground: colors.warning,
    infoBackground: colors.info,
    navigation: {
      background: colors.text,
      indicator: colors.error,
      color: colors.bgMain,
      selectedColor: colors.bgSecondary,
      navItem: {
        hoverBackground: colors.error,
      },
      submenu: {
        background: colors.text,
      },
    },
  },
  defaultPageTheme: 'home',
  fontFamily: 'Nunito Semi Bold, Arial',
  pageTheme: {
    home: genPageTheme({ colors: ['#BF1D67', '#EE2238'], shape: shapes.wave2 }),
    documentation: genPageTheme({
      colors: ['#A188EF', '#7C86E9'],
      shape: shapes.round,
    }),
    tool: genPageTheme({ colors: ['#BF1D67', '#EE2238'], shape: shapes.wave2 }),
    service: genPageTheme({
      colors: ['#BF1D67', '#EE2238'],
      shape: shapes.wave2,
    }),
    website: genPageTheme({
      colors: ['#BF1D67', '#EE2238'],
      shape: shapes.wave2,
    }),
    library: genPageTheme({
      colors: ['#BF1D67', '#EE2238'],
      shape: shapes.wave2,
    }),
    other: genPageTheme({
      colors: ['#BF1D67', '#EE2238'],
      shape: shapes.wave2,
    }),
    app: genPageTheme({ colors: ['#BF1D67', '#EE2238'], shape: shapes.wave2 }),
    apis: genPageTheme({ colors: ['#BF1D67', '#EE2238'], shape: shapes.wave2 }),
  },
  htmlFontSize: 16,
  components: (defaultTheme as UnifiedThemeOptions).components,
  typography: (defaultTheme as UnifiedThemeOptions).typography,
};

const ZenikaLightTheme = createUnifiedTheme(newOptions);

export default ZenikaLightTheme;
