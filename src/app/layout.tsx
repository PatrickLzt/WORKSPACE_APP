/**
 * @file src/app/layout.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Root Layout
 * @version 1.0
 * @date 
 *
 */

import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '../lib/providers/nextThemeProvider'
import { DM_Sans } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import { AppStateProvider } from '../lib/providers/stateProvider'
import { SupabaseUserProvider } from '../lib/providers/supabaseUserProvider'
import { Toaster } from '../components/ui/toaster'

const inter = DM_Sans({ subsets: ['latin'] }) /* Goolge Font */

export const metadata: Metadata = {
  title: 'worksp4ce',
}

/**
 * @brief Root Layout
 * 
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={twMerge('bg-background', inter.className)}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <AppStateProvider>
            <SupabaseUserProvider>
              {/* <SocketProvider> */}
              {children}
              <Toaster />
              {/* </SocketProvider> */}
            </SupabaseUserProvider>
          </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
