"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import theme from "@/theme/theme";
import store from "@/store/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Coding Test" />
        <link rel="icon" href="/favicon.ico" />
        <title>Coding Test</title>
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
