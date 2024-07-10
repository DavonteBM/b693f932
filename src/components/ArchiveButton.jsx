import { useLocation } from "react-router-dom";

const ArchiveButton = () => {
  const location = useLocation();
  // Display archive all or unarchive all depending on users route location,
  return (
    <div className="flex justify-center items-center">
      <button className="bg-gray-500 text-white font-bold py-2 px-4 my-5 rounded-lg  hover:bg-orange-400 ">
        {location.pathname === "/" ? "Archive All" : "Unarchive All"}
      </button>
    </div>
  );
};

export default ArchiveButton;
