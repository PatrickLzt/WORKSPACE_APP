/**
 * @file src/app/%28main%29/dashboard/%5BworkspaceId%5D/%5BfolderId%5D/%5BfileId%5D/page.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Page for file details
 * @version 1.0
 * @date 
 *
 */

export const dynamic = 'force-dynamic';

import QuillEditor from '@/src/components/project/QuillEditor/QuillEditor';
import { getFileDetails } from '@/src/lib/supabase/queries';
import { redirect } from 'next/navigation';

/**
 * @brief Page for file details
 */
const File = async ({ params }: { params: { fileId: string } }) => {

    const { data, error } = await getFileDetails(params.fileId);

    if (error || !data.length) {
        redirect('/dashboard');
    }

    return (
        <div className="relative ">
            <QuillEditor dirType="file" fileId={params.fileId} dirDetails={data[0] || {}} />
        </div>
    );
};

export default File;
