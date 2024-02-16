/**
 * @file src/lib/stripe/stripeClients.ts
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
 * @brief Stripe Clients
 * @version 1.0
 * @date 
 *
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

/**
 * @brief getStripe
 * 
 * @returns Promise<Stripe>
 */
export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
        );
    }
    return stripePromise;
};
