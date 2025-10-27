import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Setup from "./pages/Setup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}