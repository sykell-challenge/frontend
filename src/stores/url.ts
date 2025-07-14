import { create } from 'zustand'
import type { URL } from '../types/urls';

const useUrlStore = create<{
    url: URL | null;
    setUrl: (url: URL | null) => void;
}>((set) => ({
    url: null,
    setUrl: (url) => set({ url }),
}))

export default useUrlStore