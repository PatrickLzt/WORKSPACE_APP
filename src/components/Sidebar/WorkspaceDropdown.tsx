/**
 * @file src/components/Sidebar/WorkspaceDropdown.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief  WorkspaceDropdown component
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import { useAppState } from "@/src/lib/providers/stateProvider";
import { workspace } from "@/src/lib/supabase/supabase.types";
import { useEffect, useState } from "react";
import SelectedWorkspace from "./SelectedWorkspace";
import CustomDialogTrigger from "../global/CustomDialogTrigger";
import WorkspaceCreator from "../global/WorkspaceCreator";

interface WorkspaceDropdownProps {
    privateWorkspaces: workspace[] | [];
    sharedWorkspaces: workspace[] | [];
    collaboratingWorkspaces: workspace[] | [];
    defaultValue: workspace | undefined;
}

/**
 * @brief WorkspaceDropdown component
 * 
 * @param { privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces, defaultValue }
 * 
 * @returns JSX.Element
 */
const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({ privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces, defaultValue, }) => {

    const { dispatch, state } = useAppState() as any;
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);

    /* Effect set initial state server app state */
    useEffect(() => {
        if (!state.workspaces.length) {
            dispatch({
                type: 'SET_WORKSPACES',
                payload: {
                    workspaces: [...privateWorkspaces, ...sharedWorkspaces, ...collaboratingWorkspaces,].map((workspace) => ({ ...workspace, folders: [] })),
                },
            });
        }
    }, [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces]);

    /* Handle select */
    const handleSelect = (option: workspace) => { setSelectedOption(option); setIsOpen(false); };

    /* Effect set selected workspace */
    useEffect(() => {
        const findSelectedWorkspace = state.workspaces.find((workspace: any) => workspace.id === defaultValue?.id);

        if (findSelectedWorkspace) {
            setSelectedOption(findSelectedWorkspace);
        }

    }, [state, defaultValue]);

    return (
        <div className=" relative inline-block text-left">
            <div>
                <span onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption ? (<SelectedWorkspace workspace={selectedOption} />) : ('Select a workspace')}
                </span>
            </div>
            {isOpen && (
                <div className="origin-top-right absolute w-full rounded-md shadow-md z-50 h-[190px] bg-black/10 backdrop-blur-lg group overflow-scroll border-[1px] border-muted">
                    <div className="rounded-md flex flex-col">
                        <div className="!p-2">
                            {!!privateWorkspaces.length && (
                                <>
                                    <p className="text-muted-foreground">Private</p>
                                    <hr></hr>
                                    {privateWorkspaces.map((option) => (
                                        <SelectedWorkspace key={option.id} workspace={option} onClick={handleSelect} />
                                    ))}
                                </>
                            )}
                            {!!sharedWorkspaces.length && (
                                <>
                                    <p className="text-muted-foreground">Shared</p>
                                    <hr />
                                    {sharedWorkspaces.map((option) => (
                                        <SelectedWorkspace key={option.id} workspace={option} onClick={handleSelect} />
                                    ))}
                                </>
                            )}
                            {!!collaboratingWorkspaces.length && (
                                <>
                                    <p className="text-muted-foreground">Collaborating</p>
                                    <hr />
                                    {collaboratingWorkspaces.map((option) => (
                                        <SelectedWorkspace key={option.id} workspace={option} onClick={handleSelect} />
                                    ))}
                                </>
                            )}
                        </div>
                        <CustomDialogTrigger header="Create A Workspace" content={<WorkspaceCreator />} description="Give some description">
                            <div className="flex  transition-all  hover:bg-muted  justify-center  items-center  gap-2  p-2  w-full">
                                <article className="text-slate-500 rounded-full bg-slate-800  w-4  h-4  flex  items-center  justify-center">
                                    +
                                </article>
                                Create workspace
                            </div>
                        </CustomDialogTrigger>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkspaceDropdown;
