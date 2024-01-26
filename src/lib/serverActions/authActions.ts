/**
 * @file src/lib/serverActions/authActions.ts
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
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
 * @param email 
 * @param password 
 * @returns
 *  
 */
export async function actionLoginUser({
    email,
    password,
}: z.infer<typeof FormSchema>) {
    const supabase = createRouteHandlerClient({ cookies })
    const response = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return response
}