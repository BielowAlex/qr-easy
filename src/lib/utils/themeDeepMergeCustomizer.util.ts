import { ThemeOptions } from '@mui/material';
import lodashIsObject from 'lodash/isObject';
import lodashMergeWith from 'lodash/mergeWith';

export const themeDeepMergeCustomizerUtil = (
  objValue: ThemeOptions,
  srcValue: ThemeOptions
): ThemeOptions => {
  if (lodashIsObject(objValue) && lodashIsObject(srcValue)) {
    return lodashMergeWith(objValue, srcValue, themeDeepMergeCustomizerUtil);
  }
  return srcValue;
};
