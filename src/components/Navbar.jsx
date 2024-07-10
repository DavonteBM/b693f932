import logo from "../assets/images/logo.png";

const Navbar = () => {
  return (
    <header className="bg-orange-300">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="#"></a>
        <img className="h-10 w-auto" src={logo} alt="Air Call" />
        <span className="hidden md:block text-black text-4xl font-bold font-mono ml-2">
          AirCall
        </span>
      </div>
    </header>
  );
};

export default Navbar;
