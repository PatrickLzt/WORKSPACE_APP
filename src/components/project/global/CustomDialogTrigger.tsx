/**
 * @file src/components/global/CustomDialogTrigger.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief CustomDialogTrigger component
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import clsx from 'clsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../ui/dialog';

interface CustomDialogTriggerProps {
    header?: string;
    content?: React.ReactNode;
    children: React.ReactNode;
    description?: string;
    className?: string;
}

/**
 * @brief CustomDialogTrigger component
 * 
 * @param { header, content, children, description, className }
 * 
 * @returns JSX.Element
 */
export default function CustomDialogTrigger({ header, content, children, description, className, }: CustomDialogTriggerProps) {

    return (
        <Dialog>
            <DialogTrigger className={clsx('', className)}>{children}</DialogTrigger>
            <DialogContent className="h-screen block sm:h-[440px] overflow-scroll w-full">
                <DialogHeader>
                    <DialogTitle>{header}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    );
}