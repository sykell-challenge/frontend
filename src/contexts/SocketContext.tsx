import React, { createContext } from 'react';
import type { SocketContextType, SocketProviderProps } from '../types/socket';
import { useSocketConnection } from '../hooks/useSocketConnection';

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
});

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  url = 'localhost:8080',
}) => {
  const { socket, connected } = useSocketConnection(url);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};
