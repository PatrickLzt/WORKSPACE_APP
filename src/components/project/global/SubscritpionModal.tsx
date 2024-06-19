/**
 * @file src/components/global/subscritpionModal.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Subscription Modal
 * @version 1.0
 * @date 
 *
 */

/* Use client side rendering */
'use client';

import React, { useState } from 'react';

import { Button } from '../../ui/button';
import Loader from '../../thirdParty/Loader';
import { useToast } from '../../ui/use-toast';
import { Price, ProductWithPrice } from '@/src/lib/supabase/supabase.types';
import { useSubscriptionModal } from '@/src/lib/providers/subscriptionModalProvider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { useSupabaseUser } from '@/src/lib/providers/supabaseUserProvider';
import { formatPrice, postData } from '@/src/lib/utils';
import { getStripe } from '@/src/lib/stripe/stripeClients';

interface SubscriptionModalProps {
    products: ProductWithPrice[];
}

/**
 * @brief Subscription Modal
 * 
 * @param products
 *  
 * @returns JSX.Element
 */
export default function SubscriptionModal({ products }: SubscriptionModalProps) {

    const { open, setOpen } = useSubscriptionModal();
    const { toast } = useToast();
    const { subscription } = useSupabaseUser();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSupabaseUser();

    const onClickContinue = async (price: Price) => {
        try {
            setIsLoading(true);
            if (!user) {
                toast({ title: 'You must be logged in' });
                setIsLoading(false);
                return;
            }
            if (subscription) {
                toast({ title: 'Already on a paid plan' });
                setIsLoading(false);
                return;
            }
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price },
            });

            console.log('Getting Checkout for stripe');
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            toast({ title: 'Oppse! Something went wrong.', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {subscription?.status === 'active' ? (<DialogContent>Already on a paid plan!</DialogContent>) : (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upgrade to a Pro Plan</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        To access Pro features you need to have a paid plan.
                    </DialogDescription>
                    {products.length ? products.map((product) => (
                        <div className=" flex justify-between items-center " key={product.id}>
                            {product.prices?.map((price) => (
                                <React.Fragment key={price.id}>
                                    <b className="text-3xl text-foreground">
                                        {formatPrice(price)} / <small>{price.interval}</small>
                                    </b>
                                    <Button onClick={() => onClickContinue(price)} disabled={isLoading}>
                                        {isLoading ? <Loader /> : 'Upgrade ✨'}
                                    </Button>
                                </React.Fragment>
                            ))}
                        </div>
                    )) : ''}
                    {/* No Products Available */}
                </DialogContent>
            )}
        </Dialog>
    );
}