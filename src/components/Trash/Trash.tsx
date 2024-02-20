/**
 * @file src/components/Trash/Trash.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Trash component
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import CustomDialogTrigger from '../global/CustomDialogTrigger';
import TrashRestore from './TrashRestore';

interface TrashProps {
  children: React.ReactNode;
}

/**
 * @brief Trash component
 */
const Trash: React.FC<TrashProps> = ({ children }) => {
  return (
    <CustomDialogTrigger header="Trash" content={<TrashRestore />}>
      {children}
    </CustomDialogTrigger>
  );
};

export default Trash;
