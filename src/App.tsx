import { ReactElement } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ListsProvider } from "./contexts/ListsContext";
import { TasksProvider } from "./contexts/TasksContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SingUp";

export default function App() {
  return (
    <>
      <ToastContainer />
      <ListsProvider>
        <TasksProvider>
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
        </TasksProvider>
      </ListsProvider>
    </>
  );
}

interface ProtectedRouteGuardProps {
  children: ReactElement;
}

function ProtectedRouteGuard({ children }: ProtectedRouteGuardProps) {
  const localStorageItem = localStorage.getItem("to-do-list");
  const token = localStorageItem !== null ? JSON.parse(localStorageItem).token : null;

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}
