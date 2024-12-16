import { ThemeMode, useMUITheme } from '@/lib';
import { FormControlLabel, Switch } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, toggleTheme } = useMUITheme();
  return (
    <>
      <FormControlLabel
        labelPlacement="end"
        label={
          <Typography variant={'h4'} fontWeight={600}>
            {String(currentTheme).charAt(0).toUpperCase() +
              String(currentTheme).slice(1)}
          </Typography>
        }
        control={
          <Switch
            checked={currentTheme === ThemeMode.DARK}
            onChange={toggleTheme}
          />
        }
      />
    </>
  );
};

export { ThemeSwitcher };
