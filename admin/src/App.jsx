import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <main className="font-sans">
        <Outlet />
      </main>
    </>
  );
};

export default App;
