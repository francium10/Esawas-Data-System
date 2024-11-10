// import logo from "../assets/logo.jpeg";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-500">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Welcome to DSMA
        </h1>
        {/* <p className="mt-4 text-lg md:text-xl text-blue-400 max-w-md mx-auto">
         Login to start your assessment !
        </p> */}
      </header>
      {/* <div className="mt-10">
        <img
          src={logo}
          alt="Esawas Illustration"
          className="w-full max-w-md mx-auto shadow-lg rounded-lg"
        />
      </div> */}
      <button
        className="mt-10 px-8 py-3 bg-blue-400 text-white rounded-lg font-semibold hover:bg-blue-500 transition duration-300"
        onClick={() => (window.location.href = "/login")} // login page route
      >
        Get Started
      </button>
      <footer className="mt-12 text-center text-blue-">
        <p>&copy; {new Date().getFullYear()} Esawas. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
