import {create} from "zustand";

export enum ColorMode {
  dark = "dark",
  light = "light",
}
interface ColorModeState {
  mode: ColorMode.dark | ColorMode.light;
  toggleColorMode: () => void;
}

const localStorageColorMode = localStorage.getItem("colorMode") as ColorMode;

export const useColorModeStore = create<ColorModeState>((set) => ({
  mode: localStorageColorMode || ColorMode.light,
  toggleColorMode: () => {
    set((state) => {
      const newMode =
        state.mode === ColorMode.light ? ColorMode.dark : ColorMode.light;
      localStorage.setItem("colorMode", newMode);
      return {mode: newMode};
    });
  },
}));
