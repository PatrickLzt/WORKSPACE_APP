/**
 * @file src/components/Sidebar/Sidebar.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Sidebar component
 * @version 1.0
 * @date 
 *
 */

import { getCollaboratingWorkspaces, getFolders, getPrivateWorkspaces, getSharedWorkspaces, getUserSubscriptionStatus } from '@/src/lib/supabase/queries';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import WorkspaceDropdown from './WorkspaceDropdown';
import { ScrollArea } from '../ui/scroll-area';
import PlanUsage from './PlainUsage';
import NativeNavigation from './NativeNavigation';
import FoldersDropdownList from './FoldersDropdownList';
import UserCard from './UseCard';

interface SidebarProps {
    params: { workspaceId: string };
    className?: string;
}

/**
 * @brief Sidebar component
 * 
 * @param { params, className }
 * 
 * @returns JSX.Element
 */
const Sidebar: React.FC<SidebarProps> = async ({ params, className }) => {
    const supabase = createServerComponentClient({ cookies });
    //user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    //subscr
    const { data: subscriptionData, error: subscriptionError } =
        await getUserSubscriptionStatus(user.id);

    //folders
    const { data: workspaceFolderData, error: foldersError } = await getFolders(
        params.workspaceId
    );
    //error
    if (subscriptionError || foldersError) redirect('/dashboard');

    const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
        await Promise.all([getPrivateWorkspaces(user.id), getCollaboratingWorkspaces(user.id), getSharedWorkspaces(user.id),]);

    //get all the different workspaces private collaborating shared
    return (
        <aside className={twMerge('hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between', className)}>
            <div>
                <WorkspaceDropdown
                    privateWorkspaces={privateWorkspaces}
                    sharedWorkspaces={sharedWorkspaces}
                    collaboratingWorkspaces={collaboratingWorkspaces}
                    defaultValue={[...privateWorkspaces, ...collaboratingWorkspaces, ...sharedWorkspaces,].find((workspace) => workspace.id === params.workspaceId)}
                />
                <PlanUsage foldersLength={workspaceFolderData?.length || 0} subscription={subscriptionData} />
                <NativeNavigation myWorkspaceId={params.workspaceId} />
                <ScrollArea className="overflow-scroll relative h-[450px]">
                    <div className="pointer-events-none  w-full  absolute  bottom-0  h-20  bg-gradient-to-t  from-background  to-transparent  z-40" />
                    <FoldersDropdownList workspaceFolders={workspaceFolderData || []} workspaceId={params.workspaceId} />
                </ScrollArea>
            </div>
            <UserCard subscription={subscriptionData} />
        </aside>
    );
};

export default Sidebar;
