import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Login from "../page/login";
import Home from "../page/home";
import Region from "../page/region";
import Beaches from "../page/beaches";

const auth = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ children }) => {
  return auth() ? children : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Mainlayout>
                <Home />
              </Mainlayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/region"
          element={
            <PrivateRoute>
              <Mainlayout>
                <Region />
              </Mainlayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/beaches"
          element={
            <PrivateRoute>
              <Mainlayout>
                <Beaches />
              </Mainlayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
