import { Socket } from 'socket.io-client';

export interface SocketContextType {
    socket: Socket | null;
    connected: boolean;
}

export interface SocketProviderProps {
    children: React.ReactNode;
    url?: string;
}

export interface SocketConfig {
    url: string;
    token?: string | null;
}
