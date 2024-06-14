/**
 * @file src/lib/providers/socketProvider.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Socket Provider
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io as ClientIO } from 'socket.io-client';

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
};

/**
 * @brief Socket Provider
 * 
 * @param { children } 
 * 
 * @returns JSX.Element
 */
const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

/**
 * @brief useSocket
 * 
 * @returns SocketContextType
 */
export function useSocket() {
    return useContext(SocketContext);
}

/**
 * @brief Socket Provider
 * 
 * @param { children }
 * 
 * @returns JSX.Element
 */
export default function SocketProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, { path: '/api/socket/io', addTrailingSlash: false });

        socketInstance.on('connect', () => {
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
}
