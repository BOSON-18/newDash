import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import PrivateRoutes from "./Components/PrivateRoutes/PrivateRoutes";
import OpenRoutes from "./Components/PrivateRoutes/OpenRoutes";
import Dashboard from "./Components/Dashboard/Dashboard";
import { Chart, registerables } from 'chart.js';
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";

const App = () => {
  // Register Chart.js components or plugins
  Chart.register(...registerables);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 max-w-screen">
      <Routes>
        {/* Public route: Login page */}
        <Route path="/" element={<OpenRoutes><Login/></OpenRoutes>} />

        {/* Protected route: Dashboard */}
        <Route path="/dashboard" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
      </Routes>
    </div>
  );
};

export default App;
