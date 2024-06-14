/**
 * @file src/app/(main)/dashboard/layout.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Root Layout for the dashboard
 * @version 1.0
 * @date 
 *
 */

interface LayoutProps {
    children: React.ReactNode
}

/**
 * @brief Root Layout for the dashboard
 * 
 * @param children
 * 
 * @returns Layout template
 * 
 */
export default function DashboardLayout({ children }: LayoutProps) {

    return (
        <main className='flex over-hidden h-screen'>
            {children}
        </main>
    )
}