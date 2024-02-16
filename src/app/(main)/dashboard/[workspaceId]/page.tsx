/**
 * @file src/app/(main)/dashboard/[workspaceId]/page.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
 * @brief Workspace page
 * @version 1.0
 * @date 
 *
 */
import DashboardSetup from '@/src/components/DashoardSetup/DashboardSetup';
import db from '@/src/lib/supabase/db';
import { getUserSubscriptionStatus } from '@/src/lib/supabase/queries';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const WorkspacePage = async () => {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const workspace = await db.query.workspaces.findFirst({
        where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
    });

    const { data: subscription, error: subscriptionError } =
        await getUserSubscriptionStatus(user.id);

    if (subscriptionError) return;

    if (!workspace)
        return (
            <div className="bg-background h-screen w-screen flex justify-center items-center">
                <DashboardSetup user={user} subscription={subscription} />
            </div>
        );

    redirect(`/dashboard/${workspace.id}`);
};

export default WorkspacePage;