import React from 'react'
import AppRouter from './router/AppRouter'
import AppTheme from './theme/AppTheme'

const kurumaApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}

export default kurumaApp
