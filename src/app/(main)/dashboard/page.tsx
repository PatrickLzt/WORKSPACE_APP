/**
 * @file src/app/(main)/dashboard/page.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Supabase queries
 * @version 1.0
 * @date 
 *
 */

import DashboardSetup from "@/src/components/project/DashoardSetup/DashboardSetup"
import db from "@/src/lib/supabase/db"
import { getUserSubscriptionStatus } from "@/src/lib/supabase/queries"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

/**
 * @brief DashboardPage component
 * 
 * @returns JSX.Element
 */
export default async function DashboardPage() {

    const supabase = createServerActionClient({ cookies })

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const workspace = await db.query.workspaces.findFirst({
        where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
    });

    const { data: subscription, error: subscriptionError } = await getUserSubscriptionStatus(user.id);

    if (subscriptionError) return

    if (!workspace) {
        return (
            <div className="bag-background h-screen w-screen flex justify-center items-center">
                <DashboardSetup user={user} subscription={subscription} />
            </div>
        )
    }

    redirect(`/dashboard/${workspace.id}`)
}