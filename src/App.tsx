import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ControlPanel } from "./ControlPanel";
import { UserProvider } from "./UserContext";
import { CookiesProvider } from "react-cookie";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "@churchapps/apphelper/dist/components/markdownEditor/editor.css";
//TODO export the css from apphelper
import { EnvironmentHelper } from "./helpers";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./queryClient";

declare module '@mui/material/styles' {
  interface Palette {
    InputBox: {
      headerText: string;
    };
  }
  interface PaletteOptions {
    InputBox?: {
      headerText?: string;
    };
  }
}

const mdTheme = createTheme({
  palette: {
    InputBox: {
      headerText: "#333333"
    }
  },
  components: {
    MuiTextField: { defaultProps: { margin: "normal" } },
    MuiFormControl: { defaultProps: { margin: "normal" } }
  }
});

const App: React.FC = () => (
  <>
    {EnvironmentHelper.Common.GoogleAnalyticsTag && (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${EnvironmentHelper.Common.GoogleAnalyticsTag}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${EnvironmentHelper.Common.GoogleAnalyticsTag}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </>
    )}

    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CookiesProvider>
          <ThemeProvider theme={mdTheme}>
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/*" element={<ControlPanel />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </CookiesProvider>
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </>
);
export default App;
