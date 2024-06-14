/**
 * @file src/lib/providers/subscriptionModalProvider.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Subscription Modal Provider
 * @version 1.0
 * @date 
 *
 */

/* Use client side rendering */
'use client';

import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from 'react';
import { ProductWithPrice } from '../supabase/supabase.types';
import SubscriptionModal from '@/src/components/project/global/SubscritpionModal';

type SubscriptionModalContextType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const SubscriptionModalContext = createContext<SubscriptionModalContextType>({
    open: false,
    setOpen: () => { },
});

/**
 * @brief useSubscriptionModal
 * 
 * @returns SubscriptionModalContextType
 */
export function useSubscriptionModal() {
    return useContext(SubscriptionModalContext);
}

export function SubscriptionModalProvider({ children, products, }: { children: React.ReactNode; products: ProductWithPrice[]; }) {

    const [open, setOpen] = useState(false);

    return (
        <SubscriptionModalContext.Provider value={{ open, setOpen }}>
            {children}
            <SubscriptionModal products={products} />
        </SubscriptionModalContext.Provider>
    );
}
