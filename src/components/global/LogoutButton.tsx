/**
 * @file src/components/global/LogoutButton.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief LogoutButton component
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useAppState } from '@/src/lib/providers/stateProvider';

interface LogoutButtonProps {
    children: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {

    const { dispatch } = useAppState() as any;
    const router = useRouter();
    const supabase = createClientComponentClient();
    const logout = async () => { await supabase.auth.signOut(); router.push('/login'); dispatch({ type: 'SET_WORKSPACES', payload: { workspaces: [] } }); };

    return (
        <Button variant="ghost" size="icon" className="p-0" onClick={logout}>
            {children}
        </Button>
    );
};

export default LogoutButton;
