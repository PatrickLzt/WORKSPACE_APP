/**
 * @file src/app/lib/supabase/schema.ts
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
 * @brief Database schema
 * @version 1.0
 * @date 
 *
 */
import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

/**
 * @brief Database schema
 */
export const workspaces = pgTable('workspaces', {
    id: uuid('uuid').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }),
    workspaceOwner: uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),
});
