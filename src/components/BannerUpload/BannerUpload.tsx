/**
 * @file src/components/BannerUpload/BannerUpload.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Banner Upload component
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import CustomDialogTrigger from "../global/CustomDialogTrigger";
import BannerUploadForm from "./BannerUploadForm";

interface BannerUploadProps {
    children: React.ReactNode;
    className?: string;
    dirType: 'workspace' | 'file' | 'folder';
    id: string;
}

/**
 * @brief Banner Upload component
 * 
 * @param { id, dirType, children, className }
 * 
 * @returns JSX.Element
 */
const BannerUpload: React.FC<BannerUploadProps> = ({ id, dirType, children, className, }) => {

    return (
        <CustomDialogTrigger header="Upload Banner" content={
            <BannerUploadForm dirType={dirType} id={id} />} className={className}>
            {children}
        </CustomDialogTrigger>
    );
};

export default BannerUpload;
