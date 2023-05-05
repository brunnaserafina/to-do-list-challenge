import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/SingUp";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </>
  );
}
