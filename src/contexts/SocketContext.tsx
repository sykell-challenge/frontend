import React, { createContext, useContext } from 'react';
import type { SocketContextType, SocketProviderProps } from '../types/socket';
import { useSocketConnection } from '../hooks/useSocketConnection';

const SocketContext = createContext<SocketContextType>({
    socket: null,
    connected: false,
});

export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ 
    children, 
    url = "localhost:8080" 
}) => {
    const { socket, connected } = useSocketConnection(url);

    return (
        <SocketContext.Provider value={{ socket, connected }}>
            {children}
        </SocketContext.Provider>
    );
};
