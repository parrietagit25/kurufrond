import React from 'react'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { pcrTheme } from './pcrTheme';

const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ pcrTheme }>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />

        { children }
    </ThemeProvider>
  )
}

export default AppTheme
