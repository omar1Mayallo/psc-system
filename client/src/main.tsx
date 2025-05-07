import React from "react";
import ReactDOM from "react-dom/client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackbarProvider, closeSnackbar} from "notistack";
import {IconButton} from "@mui/material";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import CloseIcon from "@mui/icons-material/Close";
import App from "./app";
import "./index.css";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        anchorOrigin={{horizontal: "right", vertical: "top"}}
        preventDuplicate
        autoHideDuration={3000}
        maxSnack={3}
        action={(snackbarId) => (
          <IconButton
            onClick={() => {
              closeSnackbar(snackbarId);
            }}
          >
            <CloseIcon sx={{color: "white"}} />
          </IconButton>
        )}
      >
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
