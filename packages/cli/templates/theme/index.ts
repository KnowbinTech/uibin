import { colors } from './colors';
import { radius } from './radius';
import type { Theme, ThemeOptions } from '../types/theme';
import { deepMerge } from '../utils/deepMerge';

export const defaultTheme: Theme = {
  colors,
  radius,
};

export function defineTheme(options: ThemeOptions = {}): Theme {
  return deepMerge(defaultTheme, options) as Theme;
}

export { colors, radius };
export type { Theme, ThemeOptions }; 