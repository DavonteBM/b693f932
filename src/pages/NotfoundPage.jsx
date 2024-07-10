import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotfoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-center text-4xl font-bold">
        Page Not Found ... You will be redirected to the home page of AirCall
      </h1>
      .
    </div>
  );
};

export default NotfoundPage;
