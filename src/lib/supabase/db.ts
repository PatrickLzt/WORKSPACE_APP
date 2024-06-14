/**
 * @file src/app/lib/supabase/db.ts
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Database connection
 * @version 1.0
 * @date 
 *
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import * as schema from '../../../migrations/schema'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

dotenv.config({ path: '../../../env' })

if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL')
}

/**
 * @brief Database connection
 */
const client = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });

/**
 * @brief Create database instance
 */
const db = drizzle(client, { schema })

/**
 * @brief Migrate database with schema
 */
async function migrateDb() {
    try {
        console.log('Migrating client...')
        await migrate(db, { migrationsFolder: 'migrations' })
        console.log('Database migrated successfully')
    } catch (error) {
        console.error('Error migrating client', error)
    }
}

migrateDb()

export default db
