/**
 * @file src/app/(main)/dashboard/[workspaceId]/layout.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
 * @brief Root Layout for the workspace pages
 * @version 1.0
 * @date 
 *
 */

import { getActiveProductsWithPrice } from "@/src/lib/supabase/queries";

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
const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
    const { data: products, error } = await getActiveProductsWithPrice();
    if (error) throw new Error();
    return (
        <main className="flex over-hidden h-screen">
            <SubscriptionModalProvider products={products}>
                {children}
            </SubscriptionModalProvider>
        </main>
    );
};
export default Layout