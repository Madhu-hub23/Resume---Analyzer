import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import Result from "./pages/Result";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard" />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

          <Route
  path="/upload"
  element={<ResumeUpload />}
/>

<Route
  path="/results"
  element={<Result />}
/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;