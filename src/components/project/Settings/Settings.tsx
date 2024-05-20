/**
 * @file src/components/Sidebar/Sidebar.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Sidebar component
 * @version 1.0
 * @date 
 *
 */

import CustomDialogTrigger from "../global/CustomDialogTrigger";
import SettingsForm from "./SettingsForm";

interface SettingsProps {
    children: React.ReactNode;
}

/**
 * @brief Settings component
 * 
 * @param children 
 * 
 * @returns JSX.Element
 */
const Settings: React.FC<SettingsProps> = ({ children }) => {
    return (
        <CustomDialogTrigger header="Settings" content={<SettingsForm />}>
            {children}
        </CustomDialogTrigger>
    );
};

export default Settings;
