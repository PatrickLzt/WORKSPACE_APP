ALTER TABLE "files" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "folders" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "workspaces" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "collaborators" DROP CONSTRAINT "collaborators_workspace_id_workspaces_uuid_fk";
--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_workspace_id_workspaces_uuid_fk";
--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_folder_id_folders_uuid_fk";
--> statement-breakpoint
ALTER TABLE "folders" DROP CONSTRAINT "folders_workspace_id_workspaces_uuid_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folders" ADD CONSTRAINT "folders_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
