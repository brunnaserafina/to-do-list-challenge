import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SingUp";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/sign-in" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRouteGuard>
                <Home />
              </ProtectedRouteGuard>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = JSON.parse(localStorage.getItem("to-do-list"))?.token;

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}
