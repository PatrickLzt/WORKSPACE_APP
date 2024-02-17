/**
 * @file src/app/(main)/dashboard/[workspaceId]/layout.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Root Layout for the workspace pages
 * @version 1.0
 * @date 
 *
 */

import Sidebar from "@/src/components/Sidebar/Sidebar";

interface LayoutProps {
    children: React.ReactNode
    params: any
}

/**
 * @brief Root Layout for the dashboard
 * 
 * @param children
 * 
 * @returns Layout template
 * 
 */
const Layout: React.FC<LayoutProps> = async ({ children, params }) => {

    return (
        <main className="flex overflow-hidden h-screen w-screen">
            <Sidebar params={params} />
            <MobileSidebar>
                <Sidebar params={params} className="w-screen inline-block sm:hidden" />
            </MobileSidebar>
            <div className="dark:boder-Neutrals-12/70 border-l-[1px] w-full relative overflow-scroll">
                {children}
            </div>
        </main>
    );
};
export default Layout