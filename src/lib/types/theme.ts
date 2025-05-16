// lib/types/theme.ts
import type { colors as defaultColors } from '../theme/colors';
import type { radius as defaultRadius } from '../theme/radius';
import type { Writable } from 'svelte/store';

export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type ColorTheme = typeof defaultColors.light;
export type RadiusTheme = typeof defaultRadius;

export interface Theme {
  colors: {
    light: ColorTheme;
    dark: ColorTheme;
  };
  radius: RadiusTheme;
}

export type ThemeOptions = DeepPartial<Theme>;

export interface ThemeContextValue {
  mode: Writable<'light' | 'dark'>;
  setMode: (mode: 'light' | 'dark') => void;
} 