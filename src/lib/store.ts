import { create } from 'zustand';

interface CursorState {
    hoverState: 'default' | 'project' | 'link' | 'button' | 'hero';
    cursorText: string;
    setHoverState: (state: 'default' | 'project' | 'link' | 'button' | 'hero') => void;
    setCursorText: (text: string) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
    hoverState: 'default',
    cursorText: '',
    setHoverState: (state) => set({ hoverState: state }),
    setCursorText: (text) => set({ cursorText: text }),
}));
