import { Link, useLocation } from "react-router-dom";

const StickyButtons = () => {
  const location = useLocation();

  // Determine if the user is at the route index
  const isIndex = location.pathname === "/";

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center">
      <Link
        to="/"
        className={`flex-1 ${
          isIndex
            ? "bg-gray-400 text-white"
            : "bg-white text-black hover:bg-orange-400"
        } font-bold py-3 rounded-l-lg hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 flex items-center justify-center`}
        style={{ minWidth: "120px" }}
      >
        🕛
      </Link>
      <Link
        to="/archive"
        className={`flex-1 ${
          isIndex
            ? "bg-white text-black hover:bg-orange-400"
            : "bg-gray-400 text-white hover:bg-orange-400"
        } font-bold py-3 rounded-r-lg hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 flex items-center justify-center`}
        style={{ minWidth: "120px" }}
      >
        📚
      </Link>
    </div>
  );
};

export default StickyButtons;
