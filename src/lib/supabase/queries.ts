/**
 * @file src/lib/supabase/queries.ts
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Supabase queries
 * @version 1.0
 * @date 
 *
 */

/* Server Actions */
'use server';

import { files, folders, users, workspaces, collaborators } from '../../../migrations/schema';
import db from './db';
import { File, Folder, Subscription, User, workspace } from './supabase.types';
import { and, eq, ilike, notExists } from 'drizzle-orm';
import { validate } from 'uuid';

/**
 * @brief Create a new workspace
 * 
 * @param workspace
 *  
 * @returns Response 
 */
export async function createWorkspace(workspace: workspace) {
    try {
        await db.insert(workspaces).values(workspace);

        return { data: null, error: null };
    } catch (error) {
        console.log(error);

        return { data: null, error: 'Error' };
    }
}

/**
 * @brief Delete a workspace
 * 
 * @param workspaceId
 *  
 * @returns Response 
 */
export async function deleteWorkspace(workspaceId: string) {
    if (!workspaceId) return;

    await db.delete(workspaces).where(eq(workspaces.id, workspaceId));
}

/**
 * @brief Subscription Status
 * 
 * @param userId
 *  
 * @returns Response 
 */
export async function getUserSubscriptionStatus(userId: string) {
    try {
        const data = await db.query.subscriptions.findFirst({ where: (s, { eq }) => eq(s.userId, userId), });

        if (data) return { data: data as Subscription, error: null };

        else {
            return { data: null, error: null };
        }
    } catch (error) {
        return { data: null, error: `Error` };
    }
}

/**
 * @brief Get Folders
 * 
 * @param workspaceId
 *  
 * @returns Response 
 */
export async function getFolders(workspaceId: string) {
    const isValid = validate(workspaceId);

    if (!isValid)
        return {
            data: null,
            error: 'Error',
        };

    try {
        const results: Folder[] | [] = await db.select().from(folders).orderBy(folders.createdAt).where(eq(folders.workspaceId, workspaceId));

        return { data: results, error: null };
    } catch (error) {
        return { data: null, error: 'Error' };
    }
}

/**
 * @brief Get Workspace Details
 * 
 * @param workspaceId
 *  
 * @returns Response 
 */
export async function getWorkspaceDetails(workspaceId: string) {
    const isValid = validate(workspaceId);

    if (!isValid)
        return {
            data: [],
            error: 'Error',
        };

    try {
        const response = (await db.select().from(workspaces).where(eq(workspaces.id, workspaceId)).limit(1)) as workspace[];
        return { data: response, error: null };
    } catch (error) {
        return { data: [], error: 'Error' };
    }
}

/**
 * @brief Get Files Details
 * 
 * @param fileId
 *  
 * @returns Response 
 */
export async function getFileDetails(fileId: string) {
    const isValid = validate(fileId);

    if (!isValid) {
        console.log('🔴Error', Error);
    }

    try {
        const response = (await db.select().from(files).where(eq(files.id, fileId)).limit(1)) as unknown as File[];

        return { data: response, error: null };
    } catch (error) {
        return { data: [], error: 'Error' };
    }
}

/**
 * @brief Delete File
 * 
 * @param fileId
 *  
 * @returns Response 
 */
export async function deleteFile(fileId: string) {
    if (!fileId) return;

    await db.delete(files).where(eq(files.id, fileId));
}

/**
 * @brief Delete Folder
 * 
 * @param folderId
 *  
 * @returns Response 
 */
export async function deleteFolder(folderId: string) {
    if (!folderId) return;

    await db.delete(files).where(eq(files.id, folderId));
}

/**
 * @brief Get Folder Details
 * 
 * @param folderId
 *  
 * @returns Response 
 */
export async function getFolderDetails(folderId: string) {
    const isValid = validate(folderId);

    if (!isValid) {

        console.log('🔴Error', Error);
    }

    try {
        const response = (await db.select().from(folders).where(eq(folders.id, folderId)).limit(1)) as Folder[];

        return { data: response, error: null };
    } catch (error) {
        return { data: [], error: 'Error' };
    }
}

/**
 * @brief Get User Details
 * 
 * @param userId
 *  
 * @returns Response 
 */
export async function getPrivateWorkspaces(userId: string) {
    if (!userId) return [];

    const privateWorkspaces = (await db.select({
        id: workspaces.id,
        createdAt: workspaces.createdAt,
        workspaceOwner: workspaces.workspaceOwner,
        title: workspaces.title,
        iconId: workspaces.iconId,
        data: workspaces.data,
        inTrash: workspaces.inTrash,
        logo: workspaces.logo,
        bannerUrl: workspaces.bannerUrl,
    }).from(workspaces).where(and(notExists(db.select().from(collaborators).where(eq(collaborators.workspaceId, workspaces.id))), eq(workspaces.workspaceOwner, userId)))) as unknown as workspace[];

    return privateWorkspaces;
}

/**
 * @brief Get Collaborating Workspaces
 * 
 * @param userId
 *  
 * @returns Response 
 */
export async function getCollaboratingWorkspaces(userId: string) {
    if (!userId) return [];

    const collaboratedWorkspaces = (await db
        .select({
            id: workspaces.id,
            createdAt: workspaces.createdAt,
            workspaceOwner: workspaces.workspaceOwner,
            title: workspaces.title,
            iconId: workspaces.iconId,
            data: workspaces.data,
            inTrash: workspaces.inTrash,
            logo: workspaces.logo,
            bannerUrl: workspaces.bannerUrl,
        }).from(users).innerJoin(collaborators, eq(users.id, collaborators.userId)).innerJoin(workspaces, eq(collaborators.workspaceId, workspaces.id)).where(eq(users.id, userId))) as unknown as workspace[];

    return collaboratedWorkspaces;
}

/**
 * @brief Get Shared Workspaces
 * 
 * @param userId
 *  
 * @returns Response 
 */
export async function getSharedWorkspaces(userId: string) {
    if (!userId) return [];

    const sharedWorkspaces = (await db.selectDistinct({
        id: workspaces.id,
        createdAt: workspaces.createdAt,
        workspaceOwner: workspaces.workspaceOwner,
        title: workspaces.title,
        iconId: workspaces.iconId,
        data: workspaces.data,
        inTrash: workspaces.inTrash,
        logo: workspaces.logo,
        bannerUrl: workspaces.bannerUrl,
    }).from(workspaces).orderBy(workspaces.createdAt).innerJoin(collaborators, eq(workspaces.id, collaborators.workspaceId)).where(eq(workspaces.workspaceOwner, userId))) as workspace[];

    return sharedWorkspaces;
}

/**
 * @brief Get Files
 * 
 * @param folderId
 *  
 * @returns Response 
 */
export async function getFiles(folderId: string) {
    const isValid = validate(folderId);

    if (!isValid) return { data: null, error: 'Error' };

    try {
        const results: any = (await db.select().from(files).orderBy(files.createdAt).where(eq(files.folderId, folderId))) as File[] | [];

        return { data: results, error: null };
    } catch (error) {
        return { data: null, error: 'Error' };
    }
}

/**
 * @brief Add collaborators
 * 
 * @param userId
 * @param workspaceId
 *  
 * @returns Response 
 */
export async function addCollaborators(users: User[], workspaceId: string) {

    users.forEach(async (user: User) => {
        const userExists = await db.query.customers.findFirst({
            where: (u: any, { eq }: any) =>
                and(eq(u.userId, user.id), eq(u.workspaceId, workspaceId)),
        });

        if (!userExists) {
            await db.insert(collaborators).values({ workspaceId, userId: user.id });
        }
    });
}

/**
 * @brief Remove collaborators
 * 
 * @param userId
 * @param workspaceId
 *  
 * @returns Response 
 */
export async function removeCollaborators(users: User[], workspaceId: string) {

    users.forEach(async (user: User) => {
        const userExists = await db.query.collaborators.findFirst({
            where: (u, { eq }) =>
                and(eq(u.userId, user.id), eq(u.workspaceId, workspaceId)),
        });

        if (userExists) {
            await db.delete(collaborators).where(and(eq(collaborators.workspaceId, workspaceId), eq(collaborators.userId, user.id)));
        }
    });
}

/**
 * @brief Find User
 * 
 * @param userId
 *  
 * @returns Response 
 */
export async function findUser(userId: string) {

    const response = await db.query.users.findFirst({
        where: (u, { eq }) => eq(u.id, userId),
    });

    return response;
}

/**
 * @brief Get Active Products
 *  
 * @returns Response 
 */
export async function getActiveProductsWithPrice() {
    try {
        const res = await db.query.products.findMany({
            where: (pro, { eq }) => eq(pro.active, true),
            with: { prices: { where: (pri: any, { eq }: any) => eq(pri.active, true), }, },
        });

        if (res.length) {
            return { data: res, error: null };
        }

        return { data: [], error: null };
    } catch (error) {
        return { data: [], error };
    }
}

/**
 * @brief Create Folder
 * 
 * @param folder
 *  
 * @returns Response 
 */
export async function createFolder(folder: Folder) {
    try {
        await db.insert(folders).values(folder);

        return { data: null, error: null };
    } catch (error) {
        return { data: null, error: 'Error' };
    }
}

/**
 * @brief Create File
 * 
 * @param file
 *  
 * @returns Response 
 */
export async function createFile(file: File) {
    try {
        await db.insert(files).values(file);

        return { data: null, error: null };
    } catch (error) {
        return { data: null, error: 'Error' };
    }
}

/**
 * @brief Update Folder
 * 
 * @param folder
 * @param folderId
 *  
 * @returns Response 
 */
export async function updateFolder(folder: Partial<Folder>, folderId: string) {
    try {
        await db.update(folders).set(folder).where(eq(folders.id, folderId));

        return { data: null, error: null };
    } catch (error) {
        return { data: null, error: 'Error' };
    }
}

/**
 * @brief Update File
 * 
 * @param file
 * @param fileId
 *  
 * @returns Response 
 */
export async function updateFile(file: Partial<File>, fileId: string) {
    try {
        await db.update(files).set(file).where(eq(files.id, fileId));

        return { data: null, error: null };
    } catch (error) {
        return { data: null, error: 'Error' };
    }
}

/**
 * @brief Update Workspace
 * 
 * @param workspace
 * @param workspaceId
 *  
 * @returns Response 
 */
export async function updateWorkspace(workspace: Partial<workspace>, workspaceId: string) {
    if (!workspaceId) return;

    try {
        await db.update(workspaces).set(workspace).where(eq(workspaces.id, workspaceId));

        return { data: null, error: null };
    } catch (error) {
        return { data: null, error: 'Error' };
    }
}

/**
 * @brief Get Collaborators
 * 
 * @param workspaceId
 *  
 * @returns Response 
 */
export async function getCollaborators(workspaceId: string) {

    const response = await db.select().from(collaborators).where(eq(collaborators.workspaceId, workspaceId));

    if (!response.length) return [];

    const userInformation: Promise<User | undefined>[] = response.map(async (user) => {
        const exists = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.id, user.userId),
        });

        return exists;
    });

    const resolvedUsers = await Promise.all(userInformation);

    return resolvedUsers.filter(Boolean) as User[];
}

/**
 * @brief Get User from Search
 * 
 * @param email
 *  
 * @returns Response 
 */
export async function getUsersFromSearch(email: string) {
    if (!email) return [];

    const accounts = db.select().from(users).where(ilike(users.email, `${email}%`));

    return accounts;
}