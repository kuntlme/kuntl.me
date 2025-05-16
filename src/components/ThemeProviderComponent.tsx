"use client"
import { ThemeProvider } from 'next-themes'
import React from 'react'

interface Props {
    children: React.ReactNode
}

const ThemeProviderComponent = ({children}: Props) => {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
        {children}  
    </ThemeProvider>
  )
}

export default ThemeProviderComponent