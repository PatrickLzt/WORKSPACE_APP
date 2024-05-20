/**
 * @file src/lib/serverActions/authActions.ts
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Auth actions
 * @version 1.0
 * @date 
 *
 */

/* Server side actions */
'use server'

import { FormSchema } from "../types";
import { z } from 'zod';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

/**
 * @brief Login user
 * 
 * @param email 
 * @param password 
 * 
 * @returns Response from supabase
 *  
 */
export async function actionLoginUser({ email, password, }: z.infer<typeof FormSchema>) {
    const supabase = createRouteHandlerClient({ cookies })
    const response = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return response
}

/**
 * @brief SignUp user
 * 
 * @param email
 * @param password
 * 
 * @returns Response from supabase
 *  
 */
export async function actionSignUpUser({ email, password }: z.infer<typeof FormSchema>) {
    const supabase = createRouteHandlerClient({ cookies })
    const { data } = await supabase.from('profiles').select('*').eq('email', email)

    if (data?.length) {
        return { error: { message: 'Email already exists', data } }
    }

    const response = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo:
                `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`
        },
    })

    return response
}