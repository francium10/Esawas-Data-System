import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <main className="font-sans">
        <Outlet />
      </main>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
