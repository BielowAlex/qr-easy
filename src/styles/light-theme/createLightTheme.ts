import { themeDeepMergeCustomizerUtil } from '@/lib/utils/themeDeepMergeCustomizer.util';
import { lightStyles } from '@/styles/light-theme/lightStyles';
import { ThemeOptions, createTheme } from '@mui/material/styles';
import lodashMergeWith from 'lodash/mergeWith';

export const createLightTheme = (options: ThemeOptions = {}) => {
  const themeOptions = lodashMergeWith(
    lightStyles,
    options,
    themeDeepMergeCustomizerUtil
  );
  return createTheme(themeOptions);
};
