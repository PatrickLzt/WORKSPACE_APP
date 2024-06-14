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

import { Menu } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import Worksp4cePageIcon from '../../thirdParty/CustomIcons/PageIcon';

interface MobileSidebarProps {
    children: React.ReactNode;
}

export const nativeNavigations = [
    {
        title: 'Sidebar',
        id: 'sidebar',
        customIcon: Menu,
    },
    {
        title: 'Pages',
        id: 'pages',
        customIcon: Worksp4cePageIcon,
    },
] as const;

/**
 * @brief MobileSidebar component
 * 
 * @param children 
 * 
 * @returns JSX.Element
 */
export default function MobileSidebar({ children }: MobileSidebarProps) {
    const [selectedNav, setSelectedNav] = useState('');
    return (
        <>
            {selectedNav === 'sidebar' && <>{children}</>}
            <nav className="bg-black/10 backdrop-blur-lg sm:hidden  fixed  z-50  bottom-0  right-0  left-0 ">
                <ul className="flex justify-between items-center p-4">
                    {nativeNavigations.map((item) => (
                        <li className="flex items-center flex-col justify-center" key={item.id} onClick={() => { setSelectedNav(item.id); }}>
                            <item.customIcon></item.customIcon>
                            <small
                                className={clsx('', {
                                    'text-muted-foreground': selectedNav !== item.id,
                                })}>
                                {item.title}
                            </small>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}