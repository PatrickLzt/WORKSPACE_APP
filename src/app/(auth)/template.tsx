/**
 * @file src/app/(site)/page.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
 * @brief Home Page
 * @version 1.0
 * @date 
 *
 */

import React from 'react';

interface TemplateProps {
    children: React.ReactNode;
}

/**
 * @brief Template
 * 
 * @return {JSX.Element} Template
 */
const Template: React.FC<TemplateProps> = ({ children }) => {
    return (
        <div className="h-screen p-6 flex justify-center">
            {children}
        </div>
    )
}


export default Template;