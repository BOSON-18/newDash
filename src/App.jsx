import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import PrivateRoutes from "./Components/PrivateRoutes/PrivateRoutes";
import Dashboard from "./Components/Dashboard/Dashboard";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* <Route  element={<PrivateRoutes />}> */}
          <Route path="/dashboard" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
    {/* </Route> */}
      </Routes>
    </div>
  );
};

export default App;
