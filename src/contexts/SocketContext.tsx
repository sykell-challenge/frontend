import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
    connected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    connected: false,
});

interface SocketProviderProps {
    children: React.ReactNode;
    url?: string;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ 
    children, 
    url = "localhost:8080" 
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const urlRef = useRef<string | null>(null);

    useEffect(() => {
        // Only create a new socket if we don't have one or URL changed
        if (socketRef.current && urlRef.current === url) {
            return;
        }

        // Clean up existing socket if URL changed
        if (socketRef.current && urlRef.current !== url) {
            console.log("URL changed, cleaning up old socket");
            socketRef.current.close();
        }

        console.log("Creating new socket connection to:", url);
        const newSocket = io(url);
        socketRef.current = newSocket;
        urlRef.current = url;

        newSocket.on("connect", () => {
            setConnected(true);
            console.log("Socket connected to:", url);
        });

        newSocket.on("disconnect", () => {
            setConnected(false);
            console.log("Socket disconnected from:", url);
        });

        newSocket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
            setConnected(false);
        });

        setSocket(newSocket);

        return () => {
            if (socketRef.current) {
                console.log("Cleaning up socket connection");
                socketRef.current.close();
                socketRef.current = null;
                urlRef.current = null;
                setSocket(null);
                setConnected(false);
            }
        };
    }, [url]);

    return (
        <SocketContext.Provider value={{ socket, connected }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
