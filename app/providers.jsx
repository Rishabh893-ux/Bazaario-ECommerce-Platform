"use client";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "@/lib/store";
import { ToastProvider } from "./components/Toast";
import { ThemeProvider } from "./components/ThemeProvider";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
