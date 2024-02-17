/**
 * @file src/lib/providers/nextThemeProvider.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Next Theme Provider
 * @version 1.0
 * @date 
 *
 */

/* Client Side Rendering */
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

/**
 * @brief Next Theme Provider
 * 
 * @param children The Children
 * @param props The Props
 * 
 * @returns The JSX Component for the Next Theme Provider
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
    )
}