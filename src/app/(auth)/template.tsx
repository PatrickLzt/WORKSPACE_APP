/**
 * @file src/app/(site)/page.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Base Template
 * @version 1.0
 * @date 
 *
 */

interface TemplateProps {
    children: React.ReactNode;
}

/**
 * @brief Template
 * 
 * @return {JSX.Element}
 */
const Template: React.FC<TemplateProps> = ({ children }) => {
    return (
        <div className="h-screen p-6 flex justify-center">
            {children}
        </div>
    )
}

export default Template;