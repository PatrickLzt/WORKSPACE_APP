/**
 * @file src/app/(site)/layout.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
 * @brief Layout for the Home Page
 * @version 1.0
 * @date 
 *
 */

import Header from "@/src/components/LandingPage/Header";

/**
 * @brief Layout for the Home Page
 * 
 */
export default function HomePageLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Header />
            {children}
        </main>
    )
}

