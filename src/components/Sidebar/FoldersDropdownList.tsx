/**
 * @file src/components/Sidebar/FoldersDropdownList.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Folders Dropdown List component
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import { PlusIcon } from 'lucide-react';
import { v4 } from 'uuid';
import { useToast } from '../ui/use-toast';
import { Folder } from '@/src/lib/supabase/supabase.types';
import { useAppState } from '@/src/lib/providers/stateProvider';
import { useSubscriptionModal } from '@/src/lib/providers/subscriptionModalProvider';
import { useEffect, useState } from 'react';
import { useSupabaseUser } from '@/src/lib/providers/supabaseUserProvider';
import { createFolder } from '@/src/lib/supabase/queries';
import { Accordion } from '../ui/accordion';
import TooltipComponent from '../global/Tooltip';
import Dropdown from './Dropdown';

interface FoldersDropdownListProps {
    workspaceFolders: Folder[];
    workspaceId: string;
}

/**
 * @brief Folders Dropdown List component
 * 
 * @param { workspaceFolders, workspaceId }
 * 
 * @returns JSX.Element
 */
const FoldersDropdownList: React.FC<FoldersDropdownListProps> = ({ workspaceFolders, workspaceId, }) => {

    // useSupabaseRealtime();

    const { state, dispatch, folderId } = useAppState() as any;
    const { open, setOpen } = useSubscriptionModal();
    const { toast } = useToast();
    const [folders, setFolders] = useState(workspaceFolders);
    const { subscription } = useSupabaseUser();

    //effec set nitial satte server app state
    useEffect(() => {
        if (workspaceFolders.length > 0) {
            dispatch({
                type: 'SET_FOLDERS', payload: {
                    workspaceId,
                    folders: workspaceFolders.map((folder) => ({
                        ...folder, files:
                            state.workspaces.find((workspace: any) => workspace.id === workspaceId)?.folders.find((f: any) => f.id === folder.id)?.files || [],
                    })),
                },
            });
        }
    }, [workspaceFolders, workspaceId]);
    //state

    useEffect(() => {
        setFolders(
            state.workspaces.find((workspace: any) => workspace.id === workspaceId)
                ?.folders || []
        );
    }, [state]);

    //add folder
    const addFolderHandler = async () => {
        if (folders.length >= 3 && !subscription) {
            setOpen(true);
            return;
        }
        const newFolder: Folder = {
            data: null,
            id: v4(),
            createdAt: new Date().toISOString(),
            title: 'Untitled',
            iconId: '📄',
            inTrash: null,
            logo: '',
            workspaceId,
            bannerUrl: '',
        };
        dispatch({
            type: 'ADD_FOLDER',
            payload: { workspaceId, folder: { ...newFolder, files: [] } },
        });
        const { data, error } = await createFolder(newFolder);
        if (error) {
            toast({ title: 'Error', variant: 'destructive', description: 'Could not create the folder', });
        } else {
            toast({ title: 'Success', description: 'Created folder.', });
        }
    };

    return (
        <>
            <div className="flex sticky  z-20  top-0  bg-background  w-full   h-10  group/title  justify-between  items-center  pr-4  text-Neutrals/neutrals-8">
                <span className="text-Neutrals-8  font-bold  text-xs">
                    FOLDERS
                </span>
                <TooltipComponent message="Create Folder">
                    <PlusIcon onClick={addFolderHandler} size={16} className="group-hover/title:inline-block hidden  cursor-pointer hover:dark:text-white" />
                </TooltipComponent>
            </div>
            <Accordion type="multiple" defaultValue={[folderId || '']} className="pb-20">
                {folders.filter((folder) => !folder.inTrash).map((folder) => (
                    <Dropdown key={folder.id} title={folder.title} listType="folder" id={folder.id} iconId={folder.iconId} />
                ))}
            </Accordion>
        </>
    );
};

export default FoldersDropdownList;
