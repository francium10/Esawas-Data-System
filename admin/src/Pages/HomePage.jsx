import logo1 from "../assets/logo1.jpeg";
import logo2 from "../assets/logo2.jpeg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-300 p-6">
      <header className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Welcome to DSMA
        </h1>
      </header>

      <div className="flex justify-center gap-4 my-4">
        <img src={logo1} alt="Africa Logo" className="w-20 md:w-24 h-auto" />
        {/* <img src={logo2} alt="Lines Logo" className="w-20 md:w-24 h-auto" /> */}
      </div>

      <Link to="/login">
        <button className="mt-10 px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-transform transform duration-300 hover:scale-105">
          Get Started
        </button>
      </Link>

      <footer className="mt-12 text-center text-black text-sm md:text-base p-4 bg-blue-300 bg-opacity-20 rounded-t-lg w-full">
        <p>&copy; {new Date().getFullYear()} Esawas. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
