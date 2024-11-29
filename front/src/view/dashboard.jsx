import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUser } from "../lib/service";
import { Trash, Pen } from "lucide-react";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); // Utilisateur en cours de modification
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

  const handleUpdate = async (updatedUser) => {
    try {
      await updateUser(updatedUser._id, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      setEditingUser(null); // Ferme le formulaire après la mise à jour
    } catch (err) {
      console.error(err);
      setError("Failed to update user. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      await deleteUser(id);
    } catch (err) {
      console.error(err);
      setError("Failed to delete user. Please try again later.");
      await handleUsers();
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
                    <td className="p-4 border border-gray-300 flex gap-2">
                      <button
                        className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600 flex items-center gap-1"
                        onClick={() => setEditingUser(user)}
                      >
                        <Pen size={16} color="white" strokeWidth={3} />
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-2 rounded hover:bg-red-600 flex items-center gap-1"
                        onClick={() => handleDelete(user._id)}
                      >
                        <Trash size={16} color="white" strokeWidth={3} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingUser);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      role: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
