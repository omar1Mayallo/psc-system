import {ReactNode, useMemo} from "react";
import {
  createTheme,
  ThemeProvider as ColorThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useColorModeStore} from "./store/theme";

export default function ThemeProvider({children}: {children: ReactNode}) {
  const mode = useColorModeStore((s) => s.mode);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ColorThemeProvider>
  );
}
