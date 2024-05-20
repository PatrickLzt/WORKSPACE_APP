/**
 * @file src/components/Sidebar/MobileSidebar.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief MobileSidebar component
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import { MAX_FOLDERS_FREE_PLAN } from "@/src/lib/constants";
import { useAppState } from "@/src/lib/providers/stateProvider";
import { Subscription } from "@/src/lib/supabase/supabase.types";
import { useEffect, useState } from "react";
import Worksp4ceDiamondIcon from "../CustomIcons/DiamondIcon";
import { Progress } from "../../ui/progress";


interface PlanUsageProps {
    foldersLength: number;
    subscription: Subscription | null;
}

const PlanUsage: React.FC<PlanUsageProps> = ({ foldersLength, subscription, }) => {

    const { workspaceId, state } = useAppState() as any;
    const [usagePercentage, setUsagePercentage] = useState((foldersLength / MAX_FOLDERS_FREE_PLAN) * 100);

    useEffect(() => {
        const stateFoldersLength = state.workspaces.find(
            (workspace: any) => workspace.id === workspaceId)?.folders.length;

        if (stateFoldersLength === undefined) return;

        setUsagePercentage((stateFoldersLength / MAX_FOLDERS_FREE_PLAN) * 100);
    }, [state, workspaceId]);

    return (
        <article className="mb-4">
            {subscription?.status !== 'active' && (
                <div className="flex gap-2 text-muted-foreground mb-2 items-center">
                    <div className="h-4 w-4">
                        <Worksp4ceDiamondIcon />
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <div>Free Plan</div>
                        <small>{usagePercentage.toFixed(0)}% / 100%</small>
                    </div>
                </div>
            )}
            {subscription?.status !== 'active' && (
                <Progress value={usagePercentage} className="h-1" />
            )}
        </article>
    );
};

export default PlanUsage;
