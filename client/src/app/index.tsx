import {RouterProvider} from "react-router-dom";
import router from "../routes";
import ThemeProvider from "./theme";
import {useLoggedUser} from "./store/auth";

function App() {
  useLoggedUser();

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
