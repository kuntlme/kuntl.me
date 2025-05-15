"use client"
import { ThemeProvider } from 'next-themes'
import React, { ReactNode } from 'react'

interface Props {
    children: React.ReactNode
}

const ThemeProviderComponent = ({children}: Props) => {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
        {children}  
    </ThemeProvider>
  )
}

export default ThemeProviderComponent