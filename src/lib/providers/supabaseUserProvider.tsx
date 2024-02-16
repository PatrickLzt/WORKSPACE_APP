/**
 * @file src/lib/providers/supabaseUserProvider.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
 * @brief Supabase User Provider
 * @version 1.0
 * @date 
 *
 */

/* Use client side rendering */
'use client';

import { AuthUser } from '@supabase/supabase-js';
import { Subscription } from '../supabase/supabase.types';
import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getUserSubscriptionStatus } from '../supabase/queries';
import { useToast } from '@/src/components/ui/use-toast';

type SupabaseUserContextType = {
    user: AuthUser | null;
    subscription: Subscription | null;
};

/**
 * @brief Supabase User Context
 * 
 * @param user
 * 
 * @returns JSX.Element
 */
const SupabaseUserContext = createContext<SupabaseUserContextType>({
    user: null,
    subscription: null,
});

/**
 * @brief useSupabaseUser
 * 
 * @returns SupabaseUserContextType
 */
export const useSupabaseUser = () => {
    return useContext(SupabaseUserContext);
};

interface SupabaseUserProviderProps {
    children: React.ReactNode;
}

/**
 * @brief Supabase User Provider
 * 
 * @param children
 * 
 * @returns JSX.Element
 */
export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
    children,
}) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const { toast } = useToast();

    const supabase = createClientComponentClient();

    //Fetch the user details
    //subscrip
    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user) {
                console.log(user);
                setUser(user);
                const { data, error } = await getUserSubscriptionStatus(user.id);
                if (data) setSubscription(data);
                if (error) {
                    toast({
                        title: 'Unexpected Error',
                        description:
                            'Oppse! An unexpected error happened. Try again later.',
                    });
                }
            }
        };
        getUser();
    }, [supabase, toast]);
    return (
        <SupabaseUserContext.Provider value={{ user, subscription }}>
            {children}
        </SupabaseUserContext.Provider>
    );
};
