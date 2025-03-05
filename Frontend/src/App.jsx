import { useState } from "react";
import Router from "./routes/Router";
import { UserProvider } from "./context/user.context";
function App() {
  return (
    <>
      <UserProvider>
        <Router />
      </UserProvider>
    </>
  );
}

export default App;
