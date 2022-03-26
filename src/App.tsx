import React, { useState, createContext } from "react";
import Login from "./pages/Login";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
export const Usercontext = createContext({ username: "", password: "" });
function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Usercontext.Provider
      value={{
        username: username,
        password: password,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <Login setUsername={setUsername} setPassword={setPassword} />
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Usercontext.Provider>
  );
}

export default App;
