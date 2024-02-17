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
    params: any
}

/**
 * @brief Root Layout for the dashboard
 * @param children
 * @param params
 * 
 * @returns Layout template
 * 
 */
const Layout: React.FC<LayoutProps> = ({ children, params }) => {
    return (
        <main className='flex over-hidden h-screen'>
            {children}
        </main>
    )
}

export default Layout