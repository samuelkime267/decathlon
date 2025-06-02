import { create } from "zustand";

type Loader = {
  isLoaderDone: boolean;
  isOverallLoaderDone: boolean;
};

type LoaderState = {
  loader: Loader;
  setLoader: (loader: Loader) => void;
  setLoaderDone: () => void;
  setOverallLoaderDone: () => void;
};

export const useStore = create<LoaderState>((set) => ({
  loader: {
    isLoaderDone: false,
    isOverallLoaderDone: false,
  },
  setLoader: (loader) => set({ loader }),
  setLoaderDone: () =>
    set((state) => ({
      loader: { ...state.loader, isLoaderDone: true },
    })),
  setOverallLoaderDone: () =>
    set((state) => ({
      loader: { ...state.loader, isOverallLoaderDone: true },
    })),
}));
