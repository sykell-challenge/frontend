import { io, Socket } from 'socket.io-client';
import type { SocketConfig } from '../types/socket';

export const createSocketConnection = (config: SocketConfig): Socket => {
  console.log('Creating new socket connection to:', config.url);

  return io(config.url, {
    auth: {
      token: config.token,
    },
  });
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};
