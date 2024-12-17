import { themeDeepMergeCustomizer } from '@/lib/utils/themeDeepMergeCustomizer';
import { darkStyles } from '@/styles/dark-theme/darkStyles';
import { ThemeOptions, createTheme } from '@mui/material/styles';
import lodashMergeWith from 'lodash/mergeWith';

export const createDarkTheme = (options: ThemeOptions = {}) => {
  const themeOptions = lodashMergeWith(
    darkStyles,
    options,
    themeDeepMergeCustomizer
  );
  return createTheme(themeOptions);
};