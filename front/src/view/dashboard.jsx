import { useEffect, useState } from "react";
import { getAllUsers } from "../lib/service";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleUsers = async () => {
    try {
      const resp = await getAllUsers();
      setUsers(resp.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load users. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-blue-500 text-white">
          <h1 className="text-xl font-bold text-center">Dashboard</h1>
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading users...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 border border-gray-300 text-left">ID</th>
                  <th className="p-4 border border-gray-300 text-left">
                    Username
                  </th>
                  <th className="p-4 border border-gray-300 text-left">
                    Email
                  </th>
                  <th className="p-4 border border-gray-300 text-left">Role</th>
                  <th className="p-4 border border-gray-300 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-4 border border-gray-300">{index + 1}</td>
                    <td className="p-4 border border-gray-300">
                      {user.username}
                    </td>
                    <td className="p-4 border border-gray-300">{user.email}</td>
                    <td className="p-4 border border-gray-300">{user.role}</td>
                    <td className="p-4 border border-gray-300">
                      <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">
                        View
                      </button>
                      <button className="ml-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
