import {create} from 'zustand';

const useMovieStore = create((set) => ({
  clickCount: 0,
  incrementClick: () => set((state) => ({ clickCount: state.clickCount + 1 })),
  resetClick: () => set({ clickCount: 0 })
}));

export default useMovieStore;
