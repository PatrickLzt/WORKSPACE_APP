DROP TABLE "customers";--> statement-breakpoint
DROP TABLE "prices";--> statement-breakpoint
DROP TABLE "products";--> statement-breakpoint
DROP TABLE "users";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "workspace_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "folder_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "workspace_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN IF EXISTS "logo";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN IF EXISTS "logo";