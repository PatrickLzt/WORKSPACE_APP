/**
 * @file src/lib/types.ts
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
 * @brief Types
 * @version 1.0
 * @date 
 *
 */

import { Socket, Server as NetServer } from 'net';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from 'next';
import { z } from 'zod'

/**
 * @brief Form schema
 * 
 */
export const FormSchema = z.object({
    email: z.string().describe('Email').email({ message: 'Invalid Email' }),
    password: z.string().describe('Password').min(1, 'Password is required'),
});

/**
 * @brief Create workspace form schema
 */
export const CreateWorkspaceFormSchema = z.object({
    workspaceName: z.string().describe('Workspace Name').min(1, 'Workspace name must be min of 1 character'),
    logo: z.any(),
});

/**
 * @brief Create Upload Banner form schema
 */
export const UploadBannerFormSchema = z.object({
    banner: z.string().describe('Banner Image'),
});

/**
 * @brief Create socket channel form schema
 */
export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};