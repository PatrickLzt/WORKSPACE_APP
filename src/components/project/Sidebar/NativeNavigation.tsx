/**
 * @file src/components/Sidebar/Sidebar.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Sidebar component
 * @version 1.0
 * @date 
 *
 */

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Worksp4ceHome from '../../thirdParty/CustomIcons/HomeIcon';
import Settings from '../Settings/Settings';
import Worksp4ceSettingsIcon from '../../thirdParty/CustomIcons/SettingsIcon';
import Worksp4ceTrashIcon from '../../thirdParty/CustomIcons/TrashIcon';
import Trash from '../Trash/Trash';

interface NativeNavigationProps {
    myWorkspaceId: string;
    className?: string;
}

/**
 * @brief NativeNavigation component
 * 
 * @param myWorkspaceId
 * @param className
 *  
 * @returns JSX.Element 
 */
export default function NativeNavigation({ myWorkspaceId, className, }: NativeNavigationProps) {

    return (
        <nav className={twMerge('my-2', className)}>
            <ul className="flex flex-col gap-2">
                <li>
                    <Link className="group/native flex text-Neutrals/neutrals-7 transition-all gap-2" href={`/dashboard/${myWorkspaceId}`}>
                        <Worksp4ceHome />
                        <span>My Workspace</span>
                    </Link>
                </li>

                <Settings>
                    <li className="group/native flex text-Neutrals/neutrals-7 transition-all gap-2 cursor-pointer">
                        <Worksp4ceSettingsIcon />
                        <span>Settings</span>
                    </li>
                </Settings>

                <Trash>
                    <li className="group/native flex text-Neutrals/neutrals-7 transition-all gap-2">
                        <Worksp4ceTrashIcon />
                        <span>Trash</span>
                    </li>
                </Trash>
            </ul>
        </nav>
    );
}