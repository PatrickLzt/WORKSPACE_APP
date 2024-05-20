/**
 * @file src/components/global/Tooltip.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Tooltip component
 * @version 1.0
 * @date 
 *
 */

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../../ui/tooltip';

interface TooltipComponentProps {
    children: React.ReactNode;
    message: string;
}

/**
 * @brief Tooltip component
 * 
 * @param { children, message }
 * 
 * @returns JSX.Element
 */
const TooltipComponent: React.FC<TooltipComponentProps> = ({ children, message }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent>{message}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TooltipComponent;
