import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        
        <Sidebar />

        <div style={{ flex: 1 }}>
          <Routes>

            {/* Default Route */}
            <Route
              path="/"
              element={<Navigate to="/dashboard" />}
            />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* Upload */}
            <Route
              path="/upload"
              element={<ResumeUpload />}
            />

          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;