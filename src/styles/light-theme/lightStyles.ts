import { ThemeOptions } from '@mui/material/styles';

export const lightStyles: ThemeOptions = {
  palette: {
    mode: 'light',
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: '#090909',
      light: '#3F3F3F',
      dark: '#292929',
      contrastText: '#fff',
    },
    secondary: {
      main: '#8F0906',
      light: '#A75958',
      dark: '#570504',
      contrastText: '#fff',
    },
    error: {
      main: '#F04438',
      light: '#FDA29B',
      dark: '#B42318',
      contrastText: '#fff',
    },
    warning: {
      main: '#ED6C02',
      light: '#FF9800',
      dark: '#E65100',
      contrastText: '#fff',
    },
    info: {
      main: '#0288D1',
      light: '#03A9F4',
      dark: '#01579B',
      contrastText: '#fff',
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#fff',
    },
    grey: {
      '50': '#FAFAFA',
      '100': '#F5F6F8',
      '200': '#E9EAEB',
      '300': '#D5D7DA',
      '400': '#A4A7AE',
      '500': '#717680',
      '600': '#535862',
      '700': '#414651',
      '800': '#252B37',
      '900': '#181D27',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: '#717680',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: '#717680',
    background: {
      paper: '#FFF',
      default: '#F5F6F8',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
};
