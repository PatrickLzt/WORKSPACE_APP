/**
 * @file src/app/lib/supabase/schema.ts
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Database schema
 * @version 1.0
 * @date 
 *
 */
import { pgTable, uuid, timestamp, text, boolean, bigint, jsonb, foreignKey, integer } from "drizzle-orm/pg-core";
import { pricingPlanInterval, pricingType, subscriptionStatus } from "../../../migrations/schema";
import { relations, sql } from "drizzle-orm";

/**
 * @brief Database workspace schema
 */
export const workspaces = pgTable('workspaces', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    })
        .defaultNow()
        .notNull(),
    workspaceOwner: uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),
});

/**
 * @brief Database folder schema
 */
export const folders = pgTable('folders', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    })
        .defaultNow()
        .notNull(),
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    bannerUrl: text('banner_url'),
    workspaceId: uuid('workspace_id')
        .notNull()
        .references(() => workspaces.id, {
            onDelete: 'cascade',
        }),
});

/**
 * @brief Database file schema
 */
export const files = pgTable('files', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    })
        .defaultNow()
        .notNull(),
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    bannerUrl: text('banner_url'),
    workspaceId: uuid('workspace_id')
        .notNull()
        .references(() => workspaces.id, {
            onDelete: 'cascade',
        }),
    folderId: uuid('folder_id')
        .notNull()
        .references(() => folders.id, {
            onDelete: 'cascade',
        }),
});

export const users = pgTable("users", {
    id: uuid("id").primaryKey().notNull(),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url"),
    billingAddress: jsonb("billing_address"),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
    paymentMethod: jsonb("payment_method"),
    email: text("email"),
},
    (table) => {
        return {
            usersIdFkey: foreignKey({
                columns: [table.id],
                foreignColumns: [table.id],
            }),
        }
    });

export const customers = pgTable("customers", {
    id: uuid("id").primaryKey().notNull().references(() => users.id),
    stripeCustomerId: text("stripe_customer_id"),
});

export const prices = pgTable("prices", {
    id: text("id").primaryKey().notNull(),
    productId: text("product_id").references(() => products.id),
    active: boolean("active"),
    description: text("description"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    unitAmount: bigint("unit_amount", { mode: "number" }),
    currency: text("currency"),
    type: pricingType("type"),
    interval: pricingPlanInterval("interval"),
    intervalCount: integer("interval_count"),
    trialPeriodDays: integer("trial_period_days"),
    metadata: jsonb("metadata"),
});

export const products = pgTable("products", {
    id: text("id").primaryKey().notNull(),
    active: boolean("active"),
    name: text("name"),
    description: text("description"),
    image: text("image"),
    metadata: jsonb("metadata"),
});

/**
 * @brief Database subscriptions schema
 */
export const subscriptions = pgTable('subscriptions', {
    id: text('id').primaryKey().notNull(),
    userId: uuid('user_id').notNull(),
    status: subscriptionStatus('status'),
    metadata: jsonb('metadata'),
    priceId: text('price_id').references(() => prices.id),
    quantity: integer('quantity'),
    cancelAtPeriodEnd: boolean('cancel_at_period_end'),
    created: timestamp('created', { withTimezone: true, mode: 'string' })
        .default(sql`now()`)
        .notNull(),
    currentPeriodStart: timestamp('current_period_start', {
        withTimezone: true,
        mode: 'string',
    })
        .default(sql`now()`)
        .notNull(),
    currentPeriodEnd: timestamp('current_period_end', {
        withTimezone: true,
        mode: 'string',
    })
        .default(sql`now()`)
        .notNull(),
    endedAt: timestamp('ended_at', {
        withTimezone: true,
        mode: 'string',
    }).default(sql`now()`),
    cancelAt: timestamp('cancel_at', {
        withTimezone: true,
        mode: 'string',
    }).default(sql`now()`),
    canceledAt: timestamp('canceled_at', {
        withTimezone: true,
        mode: 'string',
    }).default(sql`now()`),
    trialStart: timestamp('trial_start', {
        withTimezone: true,
        mode: 'string',
    }).default(sql`now()`),
    trialEnd: timestamp('trial_end', {
        withTimezone: true,
        mode: 'string',
    }).default(sql`now()`),
});

/**
 * @brief Database collaborators schema
 */
export const collaborators = pgTable('collaborators', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    workspaceId: uuid('workspace_id')
        .notNull()
        .references(() => workspaces.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    })
        .defaultNow()
        .notNull(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
});

/**
 * @brief Database Relations of products schema
 * 
 * @note DO NOT DELETE
 */
export const productsRelations = relations(products, ({ many }) => ({
    prices: many(prices),
}));

/**
 * @brief Database Relations of prices schema
 * 
 */
export const pricesRelations = relations(prices, ({ one }) => ({
    product: one(products, {
        fields: [prices.productId],
        references: [products.id],
    }),
}));