/**
 * @file src/app/api/auth/callback/route.ts
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Auth callback route
 * @version 1.0
 * @date 
 *
 */

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @brief Callback route (GET)
 * 
 * @param req 
 * 
 * @returns Redirect to dashboard 
 */
export async function GET(req: NextRequest) {
    const reqURL = new URL(req.url);

    const code = reqURL.searchParams.get('code');

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });

        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(`${reqURL.origin}/dashboard`);
}