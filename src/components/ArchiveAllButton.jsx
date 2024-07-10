import { useState, useEffect } from "react";

const ArchiveAllButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [calls, setCalls] = useState([]);

  // Fetch all call data
  useEffect(() => {
    const fetchCalls = async () => {
      const BASEURL = "https://aircall-backend.onrender.com/activities";
      try {
        const res = await fetch(BASEURL);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCalls(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCalls();
  }, []);

  //When button is clicked go through each call item and change is_archived to true
  const handleArchiveAll = async () => {
    setLoading(true);
    setError(null);

    try {
      const patchPromises = calls.map((call) => {
        const callId = call.id;
        const url = `https://aircall-backend.onrender.com/activities/${callId}`;
        return fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_archived: true }),
        });
      });

      const results = await Promise.all(patchPromises);
      results.forEach((res) => {
        if (!res.ok) {
          throw new Error("response not ok");
        }
      });
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
        onClick={handleArchiveAll}
        disabled={loading}
      >
        {loading ? "Loading..." : "Archive All"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
    </div>
  );
};

export default ArchiveAllButton;
