/**
 * @file src/components/Sidebar/SelectedWorkspace.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief SelectedWorkspace component
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import { workspace } from '@/src/lib/supabase/supabase.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SelectedWorkspaceProps {
    workspace: workspace;
    onClick?: (option: workspace) => void;
}

/**
 * @brief SelectedWorkspace component
 * 
 * @param { workspace, onClick }
 * 
 * @returns JSX.Element
 */
export default function SelectedWorkspace({ workspace, onClick, }: SelectedWorkspaceProps) {

    const supabase = createClientComponentClient();
    const [workspaceLogo, setWorkspaceLogo] = useState('/worksp4ceLogo.svg');

    useEffect(() => {
        if (workspace.logo) {
            const path = supabase.storage.from('workspaceLogos').getPublicUrl(workspace.logo)?.data.publicUrl; setWorkspaceLogo(path);
        }
    }, [workspace]);

    return (
        <>
            <Link href={`/dashboard/${workspace.id}`} onClick={() => { if (onClick) onClick(workspace); }} className="flex rounded-md hover:bg-muted transition-all flex-row p-2 gap-4 justify-center cursor-pointer items-center my-2 pl-10">

                <Image src={workspaceLogo} alt="workspace logo" width={26} height={26} />
                <div className="flex flex-col">
                    <p className="text-lg w-[170px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {workspace.title}
                    </p>
                </div>
            </Link>
        </>
    );
}