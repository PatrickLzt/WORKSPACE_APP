/**
 * @file src/lib/types.ts
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
 * @brief Types
 * @version 1.0
 * @date 
 *
 */

import * as z from 'zod';

/**
 * @brief Form schema
 * 
 */
export const FormSchema = z.object({
    email: z.string().describe("Email").email({ message: "Please enter a valid email" }),
    password: z.string().describe("Password").min(8, { message: "Password must be at least 8 characters long" }).max(50, { message: "Password must be at most 50 characters long" }),
})