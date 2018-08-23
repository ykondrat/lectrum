import io from 'socket.io-client';
import { SOCKET_URL } from '../REST';

export const socket = io(SOCKET_URL, {
    path: '/react/ws'
});
