/**
 * @file src/app/%28main%29/dashboard/%5BworkspaceId%5D/%5BfolderId%5D/page.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Supabase queries
 * @version 1.0
 * @date 
 *
 */

export const dynamic = 'force-dynamic';

import QuillEditor from '@/src/components/project/QuillEditor/QuillEditor';
import { getFolderDetails } from '@/src/lib/supabase/queries';
import { redirect } from 'next/navigation';

/**
 * @brief Page for folder details
 */
const Folder = async ({ params }: { params: { folderId: string } }) => {

    const { data, error } = await getFolderDetails(params.folderId);

    if (error || !data.length) {
        redirect('/dashboard');
    }

    return (
        <div className="relative ">
            <QuillEditor dirType="folder" fileId={params.folderId} dirDetails={data[0] || {}} />
        </div>
    );
};

export default Folder;
