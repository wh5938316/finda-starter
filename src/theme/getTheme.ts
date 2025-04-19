import type { CssVarsThemeOptions } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

// import type {} from '@mui/x-charts/themeAugmentation';
// import type {} from '@mui/x-date-pickers/themeAugmentation';
import {
  chartsCustomizations,
  dataDisplayCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  feedbackCustomizations,
  inputsCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
  thirdPartCustomizations,
  treeViewCustomizations,
} from './customizations';
// import type {} from '@mui/x-data-grid/themeAugmentation';
// import type {} from '@mui/x-tree-view/themeAugmentation';
import { getDesignTokens } from './themePrimitives';

export default function getTheme(): CssVarsThemeOptions {
  return {
    colorSchemes: {
      light: getDesignTokens('light'),
      dark: getDesignTokens('dark'),
    },
    components: {
      ...chartsCustomizations,
      ...dataGridCustomizations,
      ...datePickersCustomizations,
      ...treeViewCustomizations,
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
      ...thirdPartCustomizations,
    },
  };
}
