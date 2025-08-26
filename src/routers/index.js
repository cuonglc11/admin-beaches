import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Login from "../page/admin/login";
import Home from "../page/admin/home";
import Region from "../page/admin/region";
import Beaches from "../page/admin/beaches";
import HomeMainLayout from "../layouts/HomeMainLayout";
import LoginAccout from "../page/home/loginAccout";
import HomeAccount from "../page/home/home";
import ForgotPasswordForm from "../page/home/ForgotPasswordForm";
import Otp from "../page/home/Otp";
import ResetPassword from "../page/home/ResetPassword";
import Register from "../page/home/Register";

const auth = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token !== null && role === "1";
};
const authAccount = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token !== null && role === "2";
};
const PrivateRoute = ({ children }) => {
  return auth() ? children : <Navigate to="/login" replace />;
};
const PrivateAccountRoute = ({ children }) => {
  return authAccount() ? children : <Navigate to="/login-account" replace />;
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
        <Route
          path="/login-account"
          element={
            <HomeMainLayout>
              <LoginAccout />
            </HomeMainLayout>
          }
        />
        <Route
          path="/account/home"
          element={
            <PrivateAccountRoute>
              <HomeMainLayout>
                <HomeAccount />
              </HomeMainLayout>
            </PrivateAccountRoute>
          }
        />
        <Route
          path="/forgot-passs"
          element={
            <HomeMainLayout>
              <ForgotPasswordForm />
            </HomeMainLayout>
          }
        />
        <Route
          path="/otp"
          element={
            <HomeMainLayout>
              <Otp />
            </HomeMainLayout>
          }
        />
        <Route
          path="/reset-pass"
          element={
            <HomeMainLayout>
              <ResetPassword />
            </HomeMainLayout>
          }
        />
        <Route
          path="/register-account"
          element={
            <HomeMainLayout>
              <Register />
            </HomeMainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
