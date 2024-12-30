import { useMediaQuery, useTheme } from '@mui/material';

const useBreakpoints = () => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isXl = useMediaQuery(theme.breakpoints.up('lg'));

  return { isXs, isSm, isMd, isLg, isXl };
};

export { useBreakpoints };
