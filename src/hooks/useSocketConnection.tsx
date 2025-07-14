import { useEffect, useState, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { createSocketConnection, getAuthToken } from '../utils/socketUtils';
import useCrawlStore from '../stores/crawl';
import type { SocketMessage } from '../types/apis/crawl';
import useUrlStore from '../stores/job';

interface UseSocketResult {
    socket: Socket | null;
    connected: boolean;
}

export const useSocketConnection = (url: string = "localhost:8080"): UseSocketResult => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const urlRef = useRef<string | null>(null);
    const { updateJob } = useCrawlStore();
    const urlStoreUrl = useUrlStore((state) => state.url);
    const setUrl = useUrlStore((state) => state.setUrl);

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

        const handleCrawlQueued = (event: SocketMessage) => {
            console.log('Crawl queued:', event);
            updateJob(event.jobId, {
                ...event,
                progress: 0,
                status: 'queued',
            });
        };

        const handleCrawlStarted = (event: SocketMessage) => {
            console.log('Crawl started:', event);
            updateJob(event.jobId, {
                ...event,
                status: 'started',
                progress: 25
            });
        };

        const handleCrawlHalfCompleted = (event: SocketMessage) => {
            console.log('Crawl half completed:', event);
            updateJob(event.jobId, {
                ...event,
                status: 'started', // Keep as started but with partial data
                progress: 75,
            });
            setUrl({
                ...urlStoreUrl,
                links: event.links || [],
                ID: event.urlId,
                url: event.url,
                title: event.title || '',
                status: 'done',
                tags: event.tags || [],
                statusCode: event.statusCode || "200",
                htmlVersion: event.htmlVersion || '',
                jobId: event.jobId,
                loginFormPresent: event.loginForm || false,
            })
        };

        const handleCrawlCompleted = (event: SocketMessage) => {
            console.log('Crawl completed:', event);
            updateJob(event.jobId, {
                ...event,
                status: 'completed',
                progress: 100
            });
            setUrl({
                ...urlStoreUrl,
                links: event.links || [],
                ID: event.urlId,
                url: event.url,
                title: event.title || '',
                status: 'done',
                tags: event.tags || [],
                statusCode: event.statusCode || "200",
                htmlVersion: event.htmlVersion || '',
                jobId: event.jobId,
                loginFormPresent: event.loginForm || false,
            })
        };

        const handleCrawlError = (event: SocketMessage) => {
            console.log('Crawl error:', event);
            updateJob(event.jobId, {
                ...event,
                status: 'error',
                progress: 0
            });
        };

        const handleCrawlCancelled = (event: SocketMessage) => {
            console.log('Crawl cancelled:', event);
            updateJob(event.jobId, {
                status: 'cancelled',
                progress: 0
            });
        };

        const token = getAuthToken();
        const newSocket = createSocketConnection({ url, token });

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

        newSocket.on('crawl_queued', handleCrawlQueued);
        newSocket.on('crawl_started', handleCrawlStarted);
        newSocket.on('crawl_half_completed', handleCrawlHalfCompleted);
        newSocket.on('crawl_completed', handleCrawlCompleted);
        newSocket.on('crawl_error', handleCrawlError);
        newSocket.on('crawl_cancelled', handleCrawlCancelled);

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

    return { socket, connected };
};
