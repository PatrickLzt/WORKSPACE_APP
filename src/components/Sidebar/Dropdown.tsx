/**
 * @file src/components/Sidebar/Dropdown.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Dropdown component
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';
import clsx from 'clsx';
import { useToast } from '../ui/use-toast';
import { PlusIcon, Trash } from 'lucide-react';
import { v4 } from 'uuid';
import { useSupabaseUser } from '@/src/lib/providers/supabaseUserProvider';
import { useAppState } from '@/src/lib/providers/stateProvider';
import { createFile, updateFile, updateFolder } from '@/src/lib/supabase/queries';
import { File } from '@/src/lib/supabase/supabase.types';
import EmojiPicker from '../global/EmojiPicker';
import TooltipComponent from '../global/Tooltip';

interface DropdownProps {
    title: string;
    id: string;
    listType: 'folder' | 'file';
    iconId: string;
    children?: React.ReactNode;
    disabled?: boolean;
}

/**
 * @brief Dropdown component
 * 
 * @param { title, id, listType, iconId, children, disabled }
 * 
 * @returns JSX.Element
 */
const Dropdown: React.FC<DropdownProps> = ({ title, id, listType, iconId }) => {

    const { toast } = useToast();
    const { user } = useSupabaseUser();
    const { state, dispatch, workspaceId, folderId } = useAppState();
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    /* Folder title */
    const folderTitle: string | undefined = useMemo(() => {
        if (listType === 'folder') {
            const stateTitle = state.workspaces.find((workspace: any) => workspace.id === workspaceId)?.folders.find((folder: any) => folder.id === id)?.title;

            if (title === stateTitle || !stateTitle) return title;

            return stateTitle;
        }
    }, [state, listType, workspaceId, id, title]);

    /* File title */
    const fileTitle: string | undefined = useMemo(() => {
        if (listType === 'file') {

            const fileAndFolderId = id.split('folder');
            const stateTitle = state.workspaces.find((workspace: any) => workspace.id === workspaceId)?.folders.find((folder: any) => folder.id === fileAndFolderId[0])
                ?.files.find((file: any) => file.id === fileAndFolderId[1])?.title;

            if (title === stateTitle || !stateTitle) return title;

            return stateTitle;
        }
    }, [state, listType, workspaceId, id, title]);

    /* Navigate page */
    const navigatatePage = (accordionId: string, type: string) => {
        if (type === 'folder') {
            router.push(`/dashboard/${workspaceId}/${accordionId}`);
        }
        if (type === 'file') {
            router.push(`/dashboard/${workspaceId}/${folderId}/${accordionId.split('folder')[1]}`);
        }
    };

    /* Handle double click */
    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    /* Handle blur */
    const handleBlur = async () => {

        if (!isEditing) return;

        setIsEditing(false);

        const fId = id.split('folder');

        if (fId?.length === 1) {
            if (!folderTitle) return;
            toast({ title: 'Success', description: 'Folder title changed.', });

            await updateFolder({ title }, fId[0]);
        }

        if (fId.length === 2 && fId[1]) {

            if (!fileTitle) return;

            const { error } = await updateFile({ title: fileTitle }, fId[1]);

            if (error) {
                toast({ title: 'Error', variant: 'destructive', description: 'Could not update the title for this file', });
            } else {
                toast({ title: 'Success', description: 'File title changed.', });
            }
        }
    };

    /* Change emoji */
    const onChangeEmoji = async (selectedEmoji: string) => {

        if (!workspaceId) return;

        if (listType === 'folder') {
            dispatch({
                type: 'UPDATE_FOLDER',
                payload: {
                    workspaceId,
                    folderId: id,
                    folder: { iconId: selectedEmoji },
                },
            });
            const { error } = await updateFolder({ iconId: selectedEmoji }, id);
            if (error) {
                toast({ title: 'Error', variant: 'destructive', description: 'Could not update the emoji for this folder', });
            } else {
                toast({ title: 'Success', description: 'Update emoji for the folder', });
            }
        } else {
            dispatch({
                type: 'UPDATE_FILE',
                payload: {
                    workspaceId,
                    folderId: id,
                    fileId: id.split('folder')[1],
                    file: { iconId: selectedEmoji },
                },
            });
            const { error } = await updateFile({ iconId: selectedEmoji }, id.split('folder')[1]);
            if (error) {
                toast({ title: 'Error', variant: 'destructive', description: 'Could not update the emoji for this file', });
            } else {
                toast({ title: 'Success', description: 'Update emoji for the file', });
            }
        }
    };

    /* Folder title change */
    const folderTitleChange = (e: any) => {
        if (!workspaceId) return;
        const fid = id.split('folder');
        if (fid.length === 1) {
            dispatch({
                type: 'UPDATE_FOLDER',
                payload: {
                    folder: { title: e.target.value },
                    folderId: fid[0],
                    workspaceId,
                },
            });
        }
    };

    /* File title change */
    const fileTitleChange = (e: any) => {
        if (!workspaceId || !folderId) return;
        const fId = id.split('folder');
        if (fId.length === 2 && fId[1]) {
            dispatch({
                type: 'UPDATE_FILE',
                payload: {
                    file: { title: e.target.value },
                    folderId,
                    workspaceId,
                    fileId: fId[1],
                },
            });
        }
    };

    /* Move to trash */
    const moveToTrash = async () => {
        if (!user?.email || !workspaceId) return;
        const pathId = id.split('folder');
        if (listType === 'folder') {
            dispatch({
                type: 'UPDATE_FOLDER',
                payload: {
                    folder: { inTrash: `Deleted by ${user?.email}` },
                    folderId: pathId[0],
                    workspaceId,
                },
            });
            const { error } = await updateFolder(
                { inTrash: `Deleted by ${user?.email}` },
                pathId[0]
            );
            if (error) {
                toast({ title: 'Error', variant: 'destructive', description: 'Could not move the folder to trash', });
            } else {
                toast({ title: 'Success', description: 'Moved folder to trash', });
            }
        }

        if (listType === 'file') {
            dispatch({
                type: 'UPDATE_FILE',
                payload: {
                    file: { inTrash: `Deleted by ${user?.email}` },
                    folderId: pathId[0],
                    workspaceId,
                    fileId: pathId[1],
                },
            });
            const { error } = await updateFile(
                { inTrash: `Deleted by ${user?.email}` },
                pathId[1]
            );
            if (error) {
                toast({ title: 'Error', variant: 'destructive', description: 'Could not move the folder to trash', });
            } else {
                toast({ title: 'Success', description: 'Moved folder to trash', });
            }
        }
    };

    /* Group identifies */
    const isFolder = listType === 'folder';
    const groupIdentifies = clsx('dark:text-white whitespace-nowrap flex justify-between items-center w-full relative', {
        'group/folder': isFolder, 'group/file': !isFolder,
    });

    /* List styles */
    const listStyles = useMemo(() => clsx('relative', {
        'border-none text-md': isFolder,
        'border-none ml-6 text-[16px] py-1': !isFolder,
    }), [isFolder]);

    /* Hover styles */
    const hoverStyles = useMemo(() => clsx('h-full hidden rounded-sm absolute right-0 items-center justify-center', {
        'group-hover/file:block': listType === 'file',
        'group-hover/folder:block': listType === 'folder',
    }), [isFolder]);

    /* Add new file */
    const addNewFile = async () => {
        if (!workspaceId) return;
        const newFile: File = {
            folderId: id,
            data: null,
            createdAt: new Date().toISOString(),
            inTrash: null,
            title: 'Untitled',
            iconId: '📄',
            id: v4(),
            workspaceId,
            bannerUrl: '',
        };
        dispatch({
            type: 'ADD_FILE',
            payload: { file: newFile, folderId: id, workspaceId },
        });
        const { error } = await createFile(newFile);
        if (error) {
            toast({ title: 'Error', variant: 'destructive', description: 'Could not create a file', });
        } else {
            toast({ title: 'Success', description: 'File created.', });
        }
    };

    return (
        <AccordionItem value={id} className={listStyles} onClick={(e: any) => { e.stopPropagation(); navigatatePage(id, listType); }}>
            <AccordionTrigger id={listType} className="hover:no-underline p-2 dark:text-muted-foreground text-sm">
                <div className={groupIdentifies}>
                    <div className="flex gap-4 items-center justify-center overflow-hidden">
                        <div className="relative">
                            <EmojiPicker getValue={onChangeEmoji}>{iconId}</EmojiPicker>
                        </div>
                        <input type="text" value={listType === 'folder' ? folderTitle : fileTitle} className={clsx('outline-none overflow-hidden w-[140px] text-Neutrals/neutrals-7', {
                            'bg-muted cursor-text': isEditing,
                            'bg-transparent cursor-pointer': !isEditing,
                        }
                        )} readOnly={!isEditing} onDoubleClick={handleDoubleClick} onBlur={handleBlur} onChange={listType === 'folder' ? folderTitleChange : fileTitleChange} />
                    </div>
                    <div className={hoverStyles}>
                        <TooltipComponent message="Delete Folder">
                            <Trash onClick={moveToTrash} size={15} className="hover:dark:text-white dark:text-Neutrals/neutrals-7 transition-colors" />
                        </TooltipComponent>

                        {listType === 'folder' && !isEditing && (

                            <TooltipComponent message="Add File">
                                <PlusIcon onClick={addNewFile} size={15} className="hover:dark:text-white dark:text-Neutrals/neutrals-7 transition-colors" />
                            </TooltipComponent>
                        )}
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                {state.workspaces.find((workspace: any) => workspace.id === workspaceId)?.folders.find((folder: any) => folder.id === id)?.files.filter((file: any) => !file.inTrash).map((file: any) => {
                    const customFileId = `${id}folder${file.id}`;

                    return (
                        <Dropdown key={file.id} title={file.title} listType="file" id={customFileId} iconId={file.iconId} />
                    );
                })}
            </AccordionContent>
        </AccordionItem>
    );
};

export default Dropdown;
