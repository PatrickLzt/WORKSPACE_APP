/**
 * @file src/app/(main)/dashboard/[workspaceId]/page.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Workspace page
 * @version 1.0
 * @date 
 *
 */

export const dynamic = 'force-dynamic';

import QuillEditor from '@/src/components/QuillEditor/QuillEditor';
import { getWorkspaceDetails } from '@/src/lib/supabase/queries';
import { redirect } from 'next/navigation';

/**
 * @brief Workspace component
 * 
 * @param { params }
 * 
 * @returns JSX.Element 
 */
const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
    const { data, error } = await getWorkspaceDetails(params.workspaceId);
    if (error || !data.length) redirect('/dashboard');
    return (
        <div className="relative">
            <QuillEditor dirType="workspace" fileId={params.workspaceId} dirDetails={data[0] || {}} />
        </div>
    );
};

export default Workspace;