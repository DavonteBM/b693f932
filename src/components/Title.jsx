import { useLocation } from "react-router-dom";

const Title = () => {
  const location = useLocation();

  return (
    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl text-center pt-10">
      {location.pathname === "/" ? "Activity Feed 🕛" : "Archives 📚"}
    </h2>
  );
};

export default Title;
