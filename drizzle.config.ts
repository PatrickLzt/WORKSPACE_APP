/**
 * @file drizzle.config.ts
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Drizzle config
 * @version 1.0
 * @date 
 *
 */
import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

if (!process.env.DATABASE_URL) {
    throw new Error('Missing DRIZZLE_API_KEY')
}

export default {
    schema: './src/lib/supabase/schema.ts',
    out: './migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
} satisfies Config
