'use client';

import {
  commonThemeOptions,
  createDarkTheme,
  createLightTheme,
} from '@/styles';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import React, { createContext, useContext, useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Type for theme mode
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

// Interface for theme context
interface IThemeContext {
  toggleTheme: () => void;
  currentTheme: ThemeMode;
}

// Key for saving theme mode in local storage
const THEME_MODE_KEY = 'theme-mode';

// Zustand stores for managing theme mode
const useThemeStore = create(
  persist<{
    mode: ThemeMode;
    toggleTheme: () => void;
  }>(
    (set) => ({
      mode: ThemeMode.LIGHT, // Initial theme mode
      toggleTheme: () =>
        set((state) => ({
          mode:
            state.mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT,
        })),
    }),
    {
      name: THEME_MODE_KEY, // Key name for local storage
    }
  )
);

// Theme context
const ThemeContext = createContext<IThemeContext>({
  toggleTheme: () => {},
  currentTheme: ThemeMode.LIGHT,
});

export const useMUITheme = () => useContext(ThemeContext);

export const MuiThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mode, toggleTheme } = useThemeStore();

  // Compute theme based on the current mode
  const theme = useMemo(
    () =>
      mode === ThemeMode.DARK
        ? createDarkTheme(commonThemeOptions)
        : createLightTheme(commonThemeOptions),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, currentTheme: mode }}>
      <MUIThemeProvider theme={theme}>
        {/* CssBaseline provides global styles */}
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
