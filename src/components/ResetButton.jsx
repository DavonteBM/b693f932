import { useState, useEffect } from "react";

const ResetButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchCalls = async () => {
      const BASE_URL = "https://aircall-backend.onrender.com/activities";
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
          throw new Error("response not ok");
        }
        const data = await res.json();
        setCalls(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCalls();
  }, []);

  //When button is clicked go through each call and change is_archived to false
  const handleResetAll = async () => {
    setLoading(true);
    setError(null);

    const BASE_URL = "https://aircall-backend.onrender.com/activities";

    try {
      const resetPromises = calls.map((call) =>
        fetch(`${BASE_URL}/${call.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_archived: false }),
        })
      );

      await Promise.all(resetPromises);
    } catch (error) {
      setError(error.message);
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-gray-500 text-white font-bold py-2 px-4 my-5 rounded-lg shadow-md hover:bg-blue-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={handleResetAll}
        disabled={loading}
      >
        {loading ? "Loading..." : "Unarchive All"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ResetButton;
