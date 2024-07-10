import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const CallListings = () => {
  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  //Fetch data from aircall api
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
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  //Button to change if a call is archived or not. [Button works on client. Not server]
  const handleArchiveToggle = async (callId) => {
    const updatedCalls = calls.map((call) =>
      call.id === callId ? { ...call, is_archived: !call.is_archived } : call
    );
    setCalls(updatedCalls);

    try {
      const updatedCall = updatedCalls.find((call) => call.id === callId);
      const res = await fetch(
        `https://aircall-backend.onrender.com/activities/${callId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_archived: !updatedCall.is_archived }),
        }
      );

      if (!res.ok) {
        throw new Error("response not ok");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Filter calls based on the route path and if a call is archived
  let filteredCalls = calls;
  if (location.pathname === "/") {
    filteredCalls = calls.filter((call) => !call.is_archived);
  } else if (location.pathname === "/archive") {
    filteredCalls = calls.filter((call) => call.is_archived);
  }

  // if there are no calls to display for a category, let user know
  if (filteredCalls.length === 0) {
    return (
      <h1 className="flex items-center justify-center">
        This category is empty. Try switching to the next tab at the bottom
      </h1>
    );
  }

  return (
    //display data
    <div>
      {filteredCalls.map((call) => (
        <div
          key={call.id}
          className={`border-2 rounded p-4 mb-4 ${
            call.call_type === "answered"
              ? "border-green-400"
              : "border-red-400"
          }`}
        >
          <h4 className="text-base font-medium text-gray-900">{call.from}</h4>
          <dl className="mt-2 flex flex-wrap gap-4">
            <div className="flex items-center">
              <dt className="text-sm font-medium text-gray-600"> 📅: </dt>
              <dd className="ml-2 text-sm text-gray-800">
                {new Date(call.created_at).toLocaleString()}
              </dd>
            </div>
            <div className="flex items-center">
              <dt className="text-sm font-medium text-gray-600"> 📞: </dt>
              <dd className="ml-2 text-sm text-gray-800">{call.call_type}</dd>
            </div>
            <div className="flex items-center">
              <dt className="text-sm font-medium text-gray-600"> ⌚: </dt>
              <dd className="ml-2 text-sm text-gray-800">{call.duration}s</dd>
            </div>
            <div className="ml-auto flex items-center">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => {
                  setSelectedCall(call);
                }}
              >
                Details
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => handleArchiveToggle(call.id)}
              >
                {call.is_archived ? "Unarchive" : "Archive"}
              </button>
            </div>
          </dl>
        </div>
      ))}

      {selectedCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center border-orange-400">
          <div className="bg-white p-6 rounded-lg shadow-lg border-orange-400">
            <h4 className="text-base font-medium text-gray-900">
              ℹ Call Details ({selectedCall.id}) -
            </h4>
            <dl className="mt-2">
              <div>
                <dt className="text-sm font-medium text-gray-600">
                  📱 From: {selectedCall.from}
                </dt>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">
                  📲 To: {selectedCall.to}
                </dt>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">
                  ☁ Via: {selectedCall.via}
                </dt>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">
                  ↔ Direction: {selectedCall.direction}
                </dt>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">
                  📅 Date/Time:{" "}
                  {new Date(selectedCall.created_at).toLocaleString()}
                </dt>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">
                  📞 Type: {selectedCall.call_type}
                </dt>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">
                  ⌚ Duration: {selectedCall.duration}s
                </dt>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">
                  📚 Archived: {selectedCall.is_archived ? "Yes" : "No"}
                </dt>
              </div>
            </dl>
            <div className="flex justify-center mt-4">
              <button
                className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => setSelectedCall(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallListings;
