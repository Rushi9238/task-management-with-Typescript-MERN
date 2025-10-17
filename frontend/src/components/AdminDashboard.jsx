import { useEffect, useState } from "react";
import { mockAPI } from "../services/api";
import { LogOut, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/thunks/authThunks";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const allUsers = await mockAPI.getAllUsers();
    setUsers(allUsers);
    setLoading(false);
  };

  const handleDeleteUser = async (userId) => {
    if (confirm("Delete this user and all their tasks?")) {
      await mockAPI.deleteUser(userId);
      loadUsers();
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    await mockAPI.updateUserRole(userId, newRole);
    loadUsers();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Admin: {user && user.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              User Management
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage all registered users
            </p>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                        ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                        Username
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                        Role
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {u.id}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {u.username}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              u.role === "admin"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleToggleRole(u.id, u.role)}
                              className="px-3 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition disabled:opacity-50"
                              disabled={u.id === user?.id}
                            >
                              Toggle Role
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                              disabled={u.id === user.id}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Admin Features:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• View all registered users</li>
            <li>• Toggle user roles between admin and user</li>
            <li>• Delete users and their associated tasks</li>
            <li>• Cannot delete or modify your own admin account</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
