import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes/index";
import MThemeProvider from "./theme/MThemeProvider";
function App() {
  return (
  <AuthProvider>
    <BrowserRouter>
      <MThemeProvider>
        <Router />
      </MThemeProvider>
    </BrowserRouter>
  </AuthProvider>
  );
}

export default App;
